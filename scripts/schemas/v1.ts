import { writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { deepFindAndReplace, fetchRefs } from "./bundle";
import { fetchSchema } from "./fetch";

const __dirname = dirname(fileURLToPath(import.meta.url));

const name = "Recipe";
const refs = await fetchRefs(name);
await Promise.all(
  [name, ...refs].map(async r => {
    const schema = deepFindAndReplace(
      await fetchSchema(r),
      "$ref",
      x => `${x.slice("schema:".length)}.json`,
    );
    writeFileSync(
      resolve(__dirname, "schemas", `${r}.json`),
      JSON.stringify(schema),
    );
    console.log(r);
  }),
);
