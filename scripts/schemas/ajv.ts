import Ajv from "ajv";
import { fetchSchema } from "./fetch";

const ajv = new Ajv({
  loadSchema(uri) {
    if (!/^schema:/.test(uri)) {
      throw new Error(`URI didn't start with schema: ${uri}`);
    }
    const name = uri.slice("schema:".length);
    return fetchSchema(name);
  },
});
const validate = await ajv.compileAsync(await fetchSchema("Recipe"));

const data = {
  original: false,
  extra: "true",
};

const valid = validate(data);
if (valid) {
  console.log("Data is valid!");
} else {
  console.error("Data is invalid:", validate.errors);
}
