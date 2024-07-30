import { fetchSchema } from "./fetch";
import { isR } from "./helpers";
import type { SchemaOrg, BundledSchema, R, DeepOverwriteKey } from "./types";
import { writeFileSync , readFileSync} from "fs";
import Ajv from "ajv";

// const flattenExtNames = async (name: string): Promise<string[]> => {
//   const schema = await fetchSchema(name);
//   if (schema.allOf === undefined) {
//     return [];
//   }
//   const extensions = await Promise.all(
//     schema.allOf.map(async x => x["$ref"].slice("schema:".length)),
//   );
//   return (
//     await Promise.all([
//       ...extensions,
//       ...extensions.map(x => flattenExtNames(x)),
//     ])
//   ).flat();
// };

// const bundle = async (name: string): Promise<BundledSchema> => {
//   const extNames = await flattenExtNames(name);
//   const defined = [...extNames];
//   const extSchemas = await Promise.all(
//     extNames.map(async x => ({
//       ...(await fetchSchema(x)),
//       allOf: undefined,
//     })),
//   );
//   const bundled = { ...(await fetchSchema(name)), allOf: extSchemas };
//   const referred = unique(deepSearch(bundled, "$ref"));
//   const filtered = referred.filter(x =>
//     typeof x === "string"
//       ? !defined.includes(x.slice("schema:".length))
//       : false,
//   );
//   console.log(referred.length, filtered.length);
//   // TODO: use $defs
//   return bundled;
// };

const deepSearch = (obj: Object, k: string): unknown[] => {
  const results: unknown[] = [];
  for (const key in obj) {
    if (key === k) {
      results.push(obj[k]);
    }
    if (obj[key] instanceof Object) {
      results.push(...deepSearch(obj[key], k));
    }
  }
  return results;
};

// const unique = <T>(arr: T[]) => Array.from(new Set(arr));

// writeFileSync("./scripts/bundle.json", JSON.stringify(await bundle("Recipe")));

// bundle("Recipe");

const deepFindAndReplace = <T extends R, K extends string>(
  obj: T,
  k: K,
  replace: (x: string) => string,
): { matches: string[]; result: DeepOverwriteKey<T, K, string> } => {
  const matches: string[] = [];
  const result: R = { ...obj };
  for (const key in result) {
    if (result[key] instanceof Array) {
      result[key] = result[key].map(x => {
        const deepResult = deepFindAndReplace(x, k, replace);
        matches.push(...deepResult.matches);
        return deepResult.result;
      });
    } else if (isR(result[key])) {
      const deepResult = deepFindAndReplace(result[key], k, replace);
      matches.push(...deepResult.matches);
      result[key] = deepResult.result;
    } else if (typeof result[key] === "string" && key === k) {
      matches.push(result[key]);
      result[key] = replace(result[key]);
    }
  }
  return { matches, result: result as DeepOverwriteKey<T, K, string> };
};

// const adjustRefs = async (name: string) => {
//   const { matches, result } = deepFindAndReplace(
//     await fetchSchema(name),
//     "$ref",
//     x => `#/$defs/${x.slice("schema:".length)}`,
//   );
//   return { refs: matches.map(x => x.slice("schema:".length)), result };
// };

// let defs = new Set(["Recipe"]);
// let refs = new Set((await adjustRefs("Recipe")).refs);
// let i = 0;
// while (defs.size < refs.size && i < 100) {
//   i++;
//   for (const ref of refs) {
//     const deepRefs = await adjustRefs(ref);
//     deepRefs.refs.forEach(x => refs.add(x));
//     defs.add(ref);
//   }
//   console.log([defs.size, refs.size]);
// }

// console.log("done", i);

const joinSets = <T>(sets: Set<T>[]) =>
  new Set(sets.map(x => Array.from(x)).flat());

interface RefState {
  searched: Set<string>;
  refs: Set<string>;
  i: number;
}

const fetchRefsInner = async (state: RefState): Promise<RefState> => {
  if (state.i > 100) {
    throw new Error("Emergency brakes");
  }
  const unsearched = Array.from(state.refs).filter(x => !state.searched.has(x));
  if (unsearched.length === 0) {
    return state;
  }
  const newlyFound = await Promise.all(
    unsearched.map(async n =>
      deepSearch(await fetchSchema(n), "$ref")
        .filter(r => typeof r === "string")
        .map(r => r.slice("schema:".length)),
    ),
  );
  return fetchRefsInner({
    searched: joinSets([state.searched, new Set(unsearched)]),
    refs: joinSets([state.refs, new Set(newlyFound.flat())]),
    i: state.i + 1,
  });
};

const fetchRefs = async (name: string) =>
  Array.from(
    (
      await fetchRefsInner({
        searched: new Set([]),
        refs: new Set([name]),
        i: 0,
      })
    ).refs,
  ).filter(r => r !== name);

const fetchRefAdjustedSchema = async (name: string) => {
  const schema = await fetchSchema(name);
  return deepFindAndReplace(
    schema,
    "$ref",
    x => `#/$defs/${x.slice("schema:".length)}`,
  ).result;
};

const name = "Recipe";
const refs = await fetchRefs(name);
writeFileSync("./scripts/refs.txt", refs.join(","));
console.log("FETCHED REFS");
const schemas = await Promise.all(refs.map(ref => fetchRefAdjustedSchema(ref)));
console.log("FETCHED ADJUSTED SCHEMAS");
const defs: Record<string, (typeof schemas)[number]> = {};
for (const def of schemas) {
  defs[def.$id.slice("schema:".length)] = def;
}
const schema = {
  ...(await fetchRefAdjustedSchema(name)),
  $defs: {
    ...defs,
    Butt: {
      $id: "schema:Butt",
      title: "Butt",
      type: "object",
      properties: { foo: { type: "string" } },
    },
  },
};
// writeFileSync("./scripts/.bundle.json", JSON.stringify(schema));

// TODO: memoize fetching
