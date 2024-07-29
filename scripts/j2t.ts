import $RefParser from "@apidevtools/json-schema-ref-parser";
import { fetchSchema } from "./fetch";
import type { ResolverOptions } from "@apidevtools/json-schema-ref-parser";
import { writeFileSync, readFileSync } from "fs";

const everything = readFileSync('scripts/schema.json').toString();

const read: Extract<ResolverOptions["read"], Function> = async file => {
  // const name = file.url.slice("schema:".length);
  // return JSON.stringify(await fetchSchema(name));
  return everything;
};

const schema = await fetchSchema("Recipe");
const bundled = await $RefParser.bundle(schema, {
  resolve: {
    file: false,
    http: false,
    custom: { order: 1, canRead: /^schema:/i, read },
  },
});

console.log("WOOHOO BUNDLED!!!");
writeFileSync("./scripts/Recipe.json", JSON.stringify(bundled));
