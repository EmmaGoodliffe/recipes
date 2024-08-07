import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import eg from "./scraped/eg.json";
import NutritionInformation from "./scraped/NutritionInformation.json";
import Recipe from "./scraped/Recipe.json";

const __dirname = dirname(fileURLToPath(import.meta.url));

const egKeys = Object.keys(eg);
const reducedRecipeProps = Recipe.props.filter(p => egKeys.includes(p.name));
const schemas = [{ props: reducedRecipeProps }, NutritionInformation];

type Schema = (typeof schemas)[number];

type Prop = Schema["props"][number];

const unique = <T>(items: T[]) => Array.from(new Set(items));

const uniqueByKey = <K extends string, T extends Record<string, unknown>>(
  key: K,
  items: (T & Record<K, number | string>)[],
) => {
  const uniqueValues = unique(items.map(i => i[key]));
  return uniqueValues.map(v => items.filter(i => i[key] === v)[0]);
};

const intExtends = (name: string, allInts: string[]) =>
  allInts[allInts.indexOf(name) + 1] || false;

const propToDec = (prop: Prop) =>
  `/** ${prop.desc} */
"${prop.name}": ${prop.type.map(t => (t === "Text" ? "string" : prop.name === "recipeInstructions" ? "{text:string}[]" : t)).join("|")};`;

const intToDec = (name: string, props: Prop[], allInts: string[]) => {
  const ext = intExtends(name, allInts);
  return `interface ${name} ${ext ? `extends ${ext}` : ""} {
  ${props.map(propToDec).join("\n")}
}`;
};

const schemaToInts = (schema: Schema) => {
  const intNames = unique(schema.props.map(p => p.supertype));
  return intNames.map(name => ({
    name,
    dec: intToDec(
      name,
      schema.props.filter(p => p.supertype === name),
      intNames,
    ),
  }));
};

const ints = schemas.map(schemaToInts).flat();
const uniqueInts = uniqueByKey("name", ints);
const dec = uniqueInts.map(i => i.dec).join("\n\n");

writeFileSync(resolve(__dirname, "generated.ts"), dec);

const intTypes = ints.map(i => i.name);
const builtInTypes = Array.from(
  `
/** [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601) */
type Duration = string;
`.matchAll(/type (\w+) =/g),
).map(m => m[1]);
const specifiedTypes = unique(
  schemas.map(s => s.props.map(p => p.type)).flat(2),
);
const undefinedTypes = specifiedTypes.filter(
  t => ![...intTypes, ...builtInTypes, "Text"].includes(t),
);

console.log(undefinedTypes.slice(0, 5), "...", `(${undefinedTypes.length})`);

// ImageObject WebPage Person Organization ImageObject WebPageElement NutritionInformation HowToStep
