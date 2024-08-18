import { writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// const groupBy = <T extends Record<string, unknown>, K extends string>(
//   array: T[],
//   getValue: (x: T) => K,
// ) => {
//   return array.reduce<Partial<Record<K, T[]>>>((acc, item) => {
//     const key = getValue(item);
//     acc[key] = [...toArray(acc[key]), item];
//     return acc;
//   }, {}) as Record<K, T[]>;
// };

type SchemaOrgType = { description: string; allOf?: SchemaOrgType[] } & (
  | { type: "boolean" }
  | { type: "integer" }
  | { type: "number" }
  | { type: "string" }
  | { type: "object"; properties: Record<string, SchemaOrgType> }
  | { type: "array"; items: SchemaOrgType }
  | { $ref: string }
  | { anyOf: SchemaOrgType[] }
  | { oneOf: SchemaOrgType[] }
);

type SchemaOrg = {
  $schema: string;
  $id: string;
  title: string;
  type: "object";
} & SchemaOrgType;

type Options = {
  /**
   * Whether to log progress to console
   * @default false
   */
  logProgress: boolean;
  /**
   * A list of the names of the schemas whose types should be exported from the
   * typescript file, by default just the parent schema, or `true` if all
   * schemas should be exported
   * @default [schemaName]
   */
  exp: string[] | true;
  /**
   * A list of identifiers like perhaps `Event` whose type declarations should
   * be suffixed by an underscore to avoid naming collisions
   * @default []
   */
  existingIdentifiers: string[];
};

const fetchSchema = async (schemaName: string) => {
  const url = `https://raw.githubusercontent.com/charlestati/schema-org-json-schemas/master/schemas/${schemaName}.schema.json`;
  try {
    const res = await fetch(url);
    const schema: SchemaOrg = await res.json();
    return schema;
  } catch (error) {
    console.error(`error fetching ${schemaName} schema`);
    throw error;
  }
};

const toSafeIdentifier = (ref: string, forbiddenIdentifiers: string[]) =>
  forbiddenIdentifiers.includes(ref) ? `${ref}_` : ref;

const schemaToUnreferencedTs = (
  schema: SchemaOrg,
  { exp, existingIdentifiers }: Pick<Options, "exp" | "existingIdentifiers">,
) => {
  const refs = new Set<string>();

  const combineOrTypes = (ts: SchemaOrgType[]) => {
    const lists = ts.filter(t => "$ref" in t && t.$ref === "schema:ItemList");
    if (lists.length) {
      const nonLists = ts.filter(
        t => !("$ref" in t) || t.$ref !== "schema:ItemList",
      );
      return `MaybeArray<${nonLists.map(typeToTs).join(" | ")}>`;
    } else {
      return ts.map(typeToTs).join(" | ");
    }
  };

  const typeToTs = (t: SchemaOrgType) => {
    const andText =
      "allOf" in t ? t.allOf?.map(typeToTs).join(" & ") + " & " : "";
    if ("type" in t) {
      if (t.type === "boolean" || t.type === "number" || t.type === "string") {
        return andText + t.type;
      } else if (t.type === "integer") {
        return andText + "number";
      } else if (t.type === "object") {
        const props = Object.entries(t.properties ?? {})
          .map(
            ([prop, s]) => `
  /** ${s.description} */
  '${prop}': ${typeToTs(s)};`,
          )
          .join("");
        return (
          andText +
          `{
${props}
}`
        );
      } else if (t.type === "array") {
        return andText + `${typeToTs(t.items)}[]`;
      }
    } else if ("$ref" in t) {
      const ref = t.$ref.slice("schema:".length);
      refs.add(ref);
      return toSafeIdentifier(ref, existingIdentifiers);
    } else if ("oneOf" in t) {
      return combineOrTypes(t.oneOf);
    } else if ("anyOf" in t) {
      return combineOrTypes(t.anyOf);
    }
    throw new Error(
      `Don't know type ${JSON.stringify(t)} in schema ${schema.title}`,
    );
  };

  const shouldExport = exp === true || exp.includes(schema.title);
  const text = `/** ${schema.description} */
${shouldExport ? "export " : ""}type ${toSafeIdentifier(schema.title, existingIdentifiers)} = ${typeToTs(schema)};

`;
  return { text, refs };
};

const schemaToReferencedTs = async <K extends keyof Options>(
  schemaName: string,
  options: Pick<Options, K>,
) => {
  const defaultOptions: Options = {
    logProgress: false,
    exp: [schemaName],
    existingIdentifiers: [],
  };
  const { logProgress, exp, existingIdentifiers } = {
    ...defaultOptions,
    ...options,
  };
  const allRefs = new Set<string>([schemaName]);
  const allDefs = new Set<string>();
  let allText = "";
  let i = 0;
  while (allDefs.size < allRefs.size) {
    i++;
    if (i > 50) {
      throw new Error(
        `looped ${i} times without collecting enough definitions for every referenced type so something probably went wrong`,
      );
    }
    if (logProgress) {
      console.log("defined", allDefs.size, "of", allRefs.size, "schemas");
    }
    const schemaTexts = await Promise.all(
      [...allRefs]
        .filter(r => !allDefs.has(r))
        .map(async u => {
          const schema = await fetchSchema(u);
          const { text, refs } = schemaToUnreferencedTs(schema, {
            exp,
            existingIdentifiers,
          });
          allDefs.add(u);
          refs.forEach(r => allRefs.add(r));
          return text;
        }),
    );
    allText += schemaTexts.join("\n\n");
  }
  return `/*
 * This file was automatically generated according to the
 * schema at https://schema.org/${schemaName}
 * accessed via the
 * repository https://github.com/charlestati/schema-org-json-schemas
 */

/* eslint-disable @typescript-eslint/no-empty-object-type */

type MaybeArray<T> = T | T[];

${allText}`;
};

const text = await schemaToReferencedTs("Recipe", {
  logProgress: true,
  existingIdentifiers: [
    "Recipe",
    // "BroadcastChannel",
    // "Comment",
    // "Event",
    // "Map",
  ],
});
writeFileSync(resolve(__dirname, "Recipe.gen.ts"), text);
