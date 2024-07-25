import { compileFromFile } from "json-schema-to-typescript";
import { writeFileSync, readFileSync } from "fs";
import type { ResolverOptions } from "@apidevtools/json-schema-ref-parser/";
import path from "path";

const read: Extract<ResolverOptions["read"], Function> = file =>
  new Promise((resolve, reject) => {
    try {
      const name = file.url.slice("schema:".length);
      const contents = readFileSync(
        `${path.resolve()}/${name}.schema.json`,
      ).toString();
      resolve(contents);
    } catch (error) {
      console.error("error in custom resolver", error);
      reject(error);
    }
  });

const ts = await compileFromFile("Bla.schema.json", {
  $refOptions: { resolve: { local: { order: 1, canRead: /^schema:/i, read } } },
});
writeFileSync("Bla.d.ts", ts);

// TODO: use this system to programmatically generate the Recipe schema via https://github.com/charlestati/schema-org-json-schemas/blob/master/schemas/Recipe.schema.json
