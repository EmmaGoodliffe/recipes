import Ajv from "ajv";
const ajv = new Ajv();
import Base from "./Base.schema.json";
import Bla from "./Bla.schema.json";

ajv.addSchema(Base);

const validate = ajv.compile(Bla);

const data = {
    original: false,
    extra: "true"
};

const valid = validate(data);
if (valid) {
    console.log("Data is valid!");
} else {
    console.error("Data is invalid:", validate.errors);
}