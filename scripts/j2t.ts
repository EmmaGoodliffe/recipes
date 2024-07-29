import $RefParser from "@apidevtools/json-schema-ref-parser";
import { fetchSchema } from "./fetch";
import type { ResolverOptions } from "@apidevtools/json-schema-ref-parser";
import { writeFileSync, readFileSync } from "fs";

const read: Extract<ResolverOptions["read"], Function> = async file => {
  const name = file.url.slice("schema:".length);
  return JSON.stringify(await fetchSchema(name));
};

writeFileSync(
  "./scripts/Recipe.json",
  JSON.stringify(
    await $RefParser.bundle(await fetchSchema("Recipe"), {
      resolve: { custom: { order: 1, canRead: /^schema:/i, read } },
    }),
  ),
);
