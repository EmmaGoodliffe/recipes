import { readFileSync, writeFileSync } from "fs";
import { compile, compileFromFile } from "json-schema-to-typescript";
import path from "path";
import type { ResolverOptions } from "@apidevtools/json-schema-ref-parser/";

// const read: Extract<ResolverOptions["read"], Function> = file =>
//   new Promise((resolve, reject) => {
//     try {
//       const name = file.url.slice("schema:".length);
//       const contents = readFileSync(
//         `${path.resolve()}/${name}.schema.json`,
//       ).toString();
//       resolve(contents);
//     } catch (error) {
//       console.error("error in custom resolver", error);
//       reject(error);
//     }
//   });
// const ts = await compileFromFile("Bla.schema.json", {
//   $refOptions: { resolve: { local: { order: 1, canRead: /^schema:/i, read } } },
// });

const url = (name: string) =>
  `https://raw.githubusercontent.com/charlestati/schema-org-json-schemas/master/schemas/${name}.schema.json`;

const fetchSchema = async (name: string) => {
  const builtIns: Record<string, string> = {
    DateTime: "string", // [-]CCYY-MM-DDThh:mm:ss[Z|(+|-)hh:mm]
    Boolean: "boolean",
    Text: "string",
    Number: "number",
    Time: "string", // hh:mm:ss[Z|(+|-)hh:mm]
    Date: "string", // ISO 8601
  };
  if (Object.keys(builtIns).includes(name)) {
    console.log("USED A BUILT-IN!!!");
    return builtIns[name];
  }
  if (["PropertyValue"].includes(name)) {
    console.log("CIRCLES!!!");
    return readFileSync(`scripts/${name}.schema.json`).toString();
  }
  const response = await fetch(url(name));
  return JSON.stringify(await response.json());
};

const read: Extract<ResolverOptions["read"], Function> = file =>
  new Promise(async (resolve, reject) => {
    try {
      const name = file.url.slice("schema:".length);
      const schema = await fetchSchema(name);
      console.log("fetched", name, schema.length);
      resolve(schema);
    } catch (error) {
      console.error("CUSTOM ERROR!!!", error);
      reject(error);
    }
  });

writeFileSync(
  "scripts/Recipe.d.ts",
  await compile(
    JSON.parse(await fetchSchema("Thing")),
    // JSON.parse(readFileSync('scripts/Bla.schema.json').toString()),
    "Recipe",
    {
      $refOptions: {
        resolve: { hosted: { order: 1, canRead: /^schema:/i, read } },
        // dereference: { circular: true },
      },
    },
  ),
);

// TODO: try just making a massive schema via AJV and then converting via J2T
