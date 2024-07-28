import Ajv from "ajv";
import { readFileSync, writeFileSync } from "fs";
import { deepRemoveKvPair } from "./helpers";
import type { R } from "./types";
import { compile } from "json-schema-to-typescript";

const url = (name: string) =>
  `https://raw.githubusercontent.com/charlestati/schema-org-json-schemas/master/schemas/${name}.schema.json`;

const cleanSchema = (schema: R) => {
  const no$schema = { ...schema };
  delete no$schema["$schema"];
  const noUris = deepRemoveKvPair(no$schema, "format", "uri");
  const noDateTime = deepRemoveKvPair(noUris, "format", "date-time");
  const noTime = deepRemoveKvPair(noDateTime, "format", "time");
  const noDate = deepRemoveKvPair(noTime, "format", "date");
  return noDate;
};

export const fetchSchema = async (name: string) => {
  const response = await fetch(url(name));
  const schema = cleanSchema(await response.json());
  console.log(`fetched ${name}`);
  return schema;
};
