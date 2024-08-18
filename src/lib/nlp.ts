import model from "wink-eng-lite-web-model";
import wink from "wink-nlp";
import { decimalToString, doesInclude, getKeys, overlap, unique } from "./util";
import type { ItsFunction } from "wink-nlp";

const nlp = wink(model);
console.log("making model");

const nlpTokens = (text: string) => {
  const doc = nlp.readDoc(text);
  const values = doc.tokens().out(nlp.its.value);
  const POSs = doc.tokens().out(nlp.its.pos);
  const lemmas = doc.tokens().out(nlp.its.lemma as ItsFunction<string>);
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

const nounLemmas = (tokens: Token[]) =>
  unique(tokens.filter(t => t.pos === "NOUN").map(t => t.lemma));

export const UNITS = ["g", "tbsp", "tsp"] as const;

const getQuantity = (tokens: Token[]) => {
  const number = tokens[0].pos === "NUM" ? tokens[0].value : null;
  const unit =
    number !== null &&
    tokens[1].pos === "NOUN" &&
    doesInclude(UNITS, tokens[1].value)
      ? tokens[1].value
      : null;
  const i = number === null ? 0 : unit === null ? 1 : 2;
  return { number, unit, rest: tokens.slice(i) };
};

const splitBrackets = (text: string) => {
  const parts = [...text.matchAll(/([^()]+)(\([^()]+\))?/g)].map(x => ({
    ext: x[1],
    bracketed: x[2],
  }));
  return {
    parts,
    ext: parts.map(p => p.ext).join(""),
    bracketed: parts.map(p => p.bracketed).join(" "),
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

export const parseIngredient = (ing: string | undefined) => {
  if (!ing) {
    return {
      number: null,
      unit: null,
      item: [],
      description: [],
      value: "",
      nounLemmas: { bracketed: [], item: [], description: [] },
    };
  }
  const { ext, bracketed } = splitBrackets(ing);
  const extTokens = nlpTokens(ext);
  const { number, unit, rest } = getQuantity(extTokens);
  const commaParts = splitCommas(rest);
  const [item, description] =
    commaParts.length === 2 ? commaParts : [commaParts.flat(), []];
  return {
    number,
    unit,
    item,
    description,
    value: ing,
    nounLemmas: {
      bracketed: nounLemmas(nlpTokens(bracketed)),
      item: nounLemmas(item),
      description: nounLemmas(description),
    },
  };
};

export const toIngredient = (
  {
    number,
    unit,
    item,
    description,
  }: Pick<
    ReturnType<typeof parseIngredient>,
    "number" | "unit" | "item" | "description"
  >,
  includeDescription = true,
) => {
  const n = number ?? "";
  const spaceBeforeUnit = unit === "g" ? "" : " ";
  const u = unit ? spaceBeforeUnit + unit + " " : " ";
  const i = item.map(({ value }) => value).join(" ");
  const desc = description.map(({ value }) => value).join(" ");
  const d = includeDescription && desc ? `, ${desc}` : "";
  return (n + u + i + d).trim();
};

export const searchInstructionForIngredients = (
  instruction: string | undefined,
  ingredients: string[],
) => {
  const instructionTokens = nlpTokens(instruction ?? "");
  const instructionLemmas = nounLemmas(instructionTokens);
  const ingredientMatches = ingredients
    .map(parseIngredient)
    .map(i =>
      getKeys(i.nounLemmas).map(where => ({
        // TODO: clarify object by not spreading
        ...i,
        match: {
          where,
          lemmas: overlap(i.nounLemmas[where], instructionLemmas),
        },
      })),
    )
    .flat()
    .filter(i => i.match.lemmas.length);
  const matchingLemmas = ingredientMatches.map(m => m.match.lemmas).flat();
  const instructionMatches = instructionTokens.filter(t =>
    matchingLemmas.includes(t.lemma),
  );
  return { ingredientMatches, instructionMatches };
};

const scale = (x: string | null, scaling: number) => {
  if (x === null) {
    return null;
  }
  const justNumber = parseFloat(x).toString() === x;
  if (justNumber) {
    return decimalToString(scaling * parseFloat(x));
  }
  const matches = x.match(/([.\d]+)-([.\d]+)/);
  if (matches === null) {
    throw new Error(`don't know how to scale ${x}`);
  }
  const [, min, max] = matches;
  const [scaledMin, scaledMax] = [min, max].map(n =>
    decimalToString(scaling * parseFloat(n)),
  );
  return `${scaledMin}-${scaledMax}`;
};

export const scaleIngredients = (ingredients: string[], scaling: number) =>
  ingredients
    .map(parseIngredient)
    .map(ing => ({ ...ing, number: scale(ing.number, scaling) }))
    .map(ing => toIngredient(ing));
