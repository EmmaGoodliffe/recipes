export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const toArray = <T>(x: T | T[] | undefined | null) =>
  x === undefined || x === null ? [] : Array.isArray(x) ? x : [x];

const getKeys = <T extends {}>(obj: T) => Object.keys(obj) as (keyof T)[];

export const toReader = <T extends {}>(obj: T) => ({
  get<K extends string & keyof T>(key: K) {
    this.unread.delete(key);
    return obj[key];
  },
  unread: new Set(getKeys(obj)),
});

const overwrite = (x: string, overs: Record<string, string>) =>
  getKeys(overs).includes(x) ? overs[x] : x;

const unique = <T>(items: T[]) => Array.from(new Set(items));

export const uniqueByKey = <
  K extends string,
  T extends Record<string, unknown>,
>(
  key: K,
  items: (T & Record<K, number | string | null | undefined>)[],
) => {
  const uniqueValues = unique(items.map(i => i[key]));
  return uniqueValues.map(v => items.filter(i => i[key] === v)[0]);
};

const overlap = <T>(a: T[], b: T[]) => a.filter(x => b.includes(x));

const hasOverlap = <T>(a: T[], b: T[]) => overlap(a, b).length > 0;

const zip = <T>(a: T[], b: T[]): [T, T][] => a.map((x, i) => [x, b[i]]);

const isSorted = (a: number[]) => a.join(",") === [...a].sort().join(",");

/**
 * Convert ISO durations to a concise readable form
 * @param dur [ISO 8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) e.g. `P3Y6M4DT12H30M5S`
 * @returns e.g.`3y 6mo 4d 12h 30m 5s`
 */
export const durToText = (dur: string | undefined) => {
  if (!dur) {
    return null;
  }
  const smallDur = dur.toLowerCase();
  const [period, time] = smallDur.split("t").map(x =>
    Array.from(x.matchAll(/(\d+)([a-z,A-Z]+)/g)).map(m => ({
      num: parseInt(m[1]),
      label: m[2],
    })),
  );
  const pString = period
    .map(x => `${x.num}${overwrite(x.label, { p: "", m: "mo" })}`)
    .join(" ");
  const tString = time.map(x => `${x.num}${x.label}`).join(" ");
  return pString + tString;
};

/**
 * Convert ISO date to two readable forms
 * @param date [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) e.g. `2001-02-03T01:02:03+01:00`
 * @returns both the `month` of the date, e.g. `Feb 2001`, and the more `full` date-time string in current locale format, e.g. `00:02:03 03/02/2001`
 */
export const dateToText = (date: string | undefined) => {
  if (!date) {
    return null;
  }
  const d = new Date(date);
  return {
    month: `${["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()]} ${d.getUTCFullYear()}`,
    full: `${d.toLocaleTimeString()} ${d.toLocaleDateString()}`,
  };
};

import wink from "wink-nlp";
import model from "wink-eng-lite-web-model";
import eg from "./eg.json";

const nlp = wink(model);

const nlpTokens = (text: string) => {
  const doc = nlp.readDoc(text);
  const values = doc.tokens().out(nlp.its.value);
  const POSs = doc.tokens().out(nlp.its.pos);
  const lemmas = doc.tokens().out(nlp.its.lemma);
  const result = [];
  for (const i in values) {
    result.push({
      value: values[i],
      pos: POSs[i],
      lemma: lemmas[i],
    });
  }
  return result;
};

type Token = ReturnType<typeof nlpTokens>[number];

const lemmas = (tokens: Token[]) =>
  unique(tokens.filter(t => t.pos === "NOUN").map(t => t.lemma));

const getQuantity = (tokens: Token[]) => {
  const number =
    tokens[0].pos === "NUM" && tokens.filter(t => t.pos === "NUM").length === 1
      ? tokens[0].value
      : null;
  const unit =
    number !== null &&
    tokens[1].pos === "NOUN" &&
    ["g", "tbsp", "tsp"].includes(tokens[1].value)
      ? tokens[1].value
      : null;
  const i = number === null ? 0 : unit === null ? 1 : 2;
  return { number, unit, rest: tokens.slice(i) };
};

const splitBrackets = (text: string) => {
  const parts = [...text.matchAll(/([^()]+)(\([^()]+\))?/g)].map(x => ({
    ext: x[1],
    enclosed: x[2],
  }));
  return {
    parts,
    ext: parts.map(p => p.ext).join(""),
    enclosed: parts.map(p => p.enclosed).join(" "),
  };
};

const splitCommas = (tokens: Token[]) => {
  const iTokens = tokens.map((t, i) => ({ ...t, i }));
  const commaIndexes = iTokens.filter(t => t.value === ",").map(t => t.i);
  const result = [tokens.slice(0, commaIndexes[0])];
  for (let i = 0; i < commaIndexes.length; i++) {
    const ci = commaIndexes[i];
    const nci = commaIndexes[i + 1] ?? Infinity;
    result.push(tokens.slice(ci + 1, nci));
  }
  return result;
};

const parseIngredient = (ing: string) => {
  const { ext, enclosed } = splitBrackets(ing);
  const extTokens = nlpTokens(ext);
  const { number, unit, rest } = getQuantity(extTokens);
  const commas = splitCommas(rest);
  const [item, description] =
    commas.length === 2 ? commas : [commas.flat(), []];
  return {
    number,
    unit,
    item,
    description,
    value: ing,
    lemmas: {
      enclosed: lemmas(nlpTokens(enclosed)),
      item: lemmas(item),
      description: lemmas(description),
    },
  };
};

const instructions = eg.recipeInstructions.map(i => i.text);
const ingredients = eg.recipeIngredient;

const searchInstructionForIngredients = (
  instruction: string,
  ingredients: string[],
) =>
  ingredients
    .map(parseIngredient)
    .map(i =>
      getKeys(i.lemmas).map(where => ({
        ...i,
        match: {
          where,
          lemmas: overlap(i.lemmas[where], lemmas(nlpTokens(instruction))),
        },
      })),
    )
    .flat()
    .filter(i => i.match.lemmas.length);

console.log(searchInstructionForIngredients(instructions[1], ingredients));
