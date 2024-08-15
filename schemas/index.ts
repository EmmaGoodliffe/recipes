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

type SchemaType = { description: string; allOf?: SchemaType[] } & (
  | { type: "boolean" }
  | { type: "integer" }
  | { type: "number" }
  | { type: "string" }
  | { type: "object"; properties: Record<string, SchemaType> }
  | { type: "array"; items: SchemaType }
  | { $ref: string }
  | { anyOf: SchemaType[] }
  | { oneOf: SchemaType[] }
);

type Schema = SchemaType & {
  $schema: string;
  $id: string;
  title: string;
  type: "object";
};

const toGoodRefName = (ref: string) =>
  ["BroadcastChannel", "Comment", "Event", "Map"].includes(ref)
    ? `${ref}_`
    : ref;

const fetchSchema = async (schemaName: string) => {
  const url = `https://raw.githubusercontent.com/charlestati/schema-org-json-schemas/master/schemas/${schemaName}.schema.json`;
  try {
    const res = await fetch(url);
    const schema: Schema = await res.json();
    return schema;
  } catch (error) {
    console.error(`error fetching ${schemaName} schema`);
    throw error;
  }
};

const schemaToTs = (schema: Schema, exportNames: string[]) => {
  const refs = new Set<string>();

  const combineOrTypes = (ts: SchemaType[]) => {
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

  const typeToTs = (t: SchemaType) => {
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
      return toGoodRefName(ref);
    } else if ("oneOf" in t) {
      return combineOrTypes(t.oneOf);
    } else if ("anyOf" in t) {
      return combineOrTypes(t.anyOf);
    }
    throw new Error(
      `Don't know type ${JSON.stringify(t)} in schema ${schema.title}`,
    );
  };
  const text = `/** ${schema.description} */
${exportNames.includes(schema.title) ? "export " : ""}type ${toGoodRefName(schema.title)} = ${typeToTs(schema)};

`;
  return { text, refs };
};

const schemaToDefinedTs = async (schemaName: string) => {
  const allRefs = new Set<string>([schemaName]);
  const allDefs = new Set<string>();
  let allText = "";
  let i = 0;
  while (allDefs.size < allRefs.size) {
    console.log([allDefs.size, allRefs.size]);
    i++;
    if (i > 50) {
      throw new Error("emergency brakes!");
    }
    const schemaTexts = await Promise.all(
      [...allRefs]
        .filter(r => !allDefs.has(r))
        .map(async u => {
          const schema = await fetchSchema(u);
          const { text, refs } = schemaToTs(schema, [schemaName]);
          allDefs.add(u);
          refs.forEach(r => allRefs.add(r));
          return text;
        }),
    );
    allText += schemaTexts.join("\n\n");
  }
  return `/* File generated from schema.org */

type MaybeArray<T> = T | T[];

${allText}`;
};

const text = await schemaToDefinedTs("Recipe");
writeFileSync(resolve(__dirname, "generated.ts"), text);
