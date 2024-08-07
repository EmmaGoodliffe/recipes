import model from "wink-eng-lite-web-model";
import wink from "wink-nlp";
import { getKeys, overlap, unique } from "./util";
import type { ItsFunction } from "wink-nlp";

const nlp = wink(model);

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

const parseIngredient = (ing: string | undefined) => {
  if (!ing) {
    return {
      number: null,
      unit: null,
      item: [],
      description: [],
      value: "",
      lemmas: { bracketed: [], item: [], description: [] },
    };
  }
  const { ext, bracketed } = splitBrackets(ing);
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
      bracketed: lemmas(nlpTokens(bracketed)),
      item: lemmas(item),
      description: lemmas(description),
    },
  };
};

export const searchInstructionForIngredients = (
  instruction: string | undefined,
  ingredients: string[],
) => {
  const instructionTokens = nlpTokens(instruction ?? "");
  const instructionLemmas = lemmas(instructionTokens);
  const ingredientMatches = ingredients
    .map(parseIngredient)
    .map(i =>
      getKeys(i.lemmas).map(where => ({
        ...i,
        match: {
          where,
          lemmas: overlap(i.lemmas[where], instructionLemmas),
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
