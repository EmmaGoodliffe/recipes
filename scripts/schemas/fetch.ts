import { deepRemoveKvPair, omit } from "./helpers";
import type { SchemaOrg } from "./types";

const url = (name: string) =>
  `https://raw.githubusercontent.com/charlestati/schema-org-json-schemas/master/schemas/${name}.schema.json`;

export const fetchSchema = async (name: string) => {
  const response = await fetch(url(name));
  const schema = (await response.json()) as SchemaOrg;
  const no$schema = omit(schema, ["$schema"] as const);
  const noUris = deepRemoveKvPair(no$schema, "format", "uri");
  const noDateTime = deepRemoveKvPair(noUris, "format", "date-time");
  const noTime = deepRemoveKvPair(noDateTime, "format", "time");
  const noDate = deepRemoveKvPair(noTime, "format", "date");
  const cleaned = noDate;
  // console.log(`fetched ${name}`);
  return cleaned;
};
