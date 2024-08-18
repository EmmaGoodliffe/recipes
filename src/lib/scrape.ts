import { load } from "cheerio";
import { toArray } from "./types";
import type { CheerioAPI, Element } from "cheerio";

type AttrNames = Readonly<[string, string, string, Readonly<string[]>]>;

const parseAttr = (
  attr: Record<string, string | undefined>,
  attrNames: AttrNames,
): [
  string | undefined,
  string | undefined,
  string | undefined,
  Record<string, string | undefined>,
] => {
  const [propAttr, typeAttr, contentAttr] = attrNames;
  const prop = attr[propAttr];
  const type = attr[typeAttr];
  const content = attr[contentAttr];
  const rest: typeof attr = {};
  for (const [key, value] of Object.entries(attr)) {
    if (!attrNames.flat().includes(key)) {
      rest[key] = value;
    }
  }
  return [prop, type, content, rest];
};

type MaybeArray<T> = T | T[];

type ParsedHtml = Record<
  string,
  MaybeArray<
    Record<"type" | "content" | "text", string | undefined> & {
      attr: Record<string, string | undefined>;
      children: ParsedHtml;
    }
  >
>;

/**
 * Like `Object.assign` but puts duplicated keys' values into an array rather than overwriting
 * @param arr array of objects, e.g. `[{a:1},{b:2},{a:3}]`
 * @returns overlayed object, e.g `{a:[1,3],b:2}`
 */
const overlay = <T>(arr: Record<string, T | T[]>[]) => {
  const result: (typeof arr)[number] = {};
  for (const x of arr) {
    for (const [key, value] of Object.entries(x)) {
      if (key in result) {
        result[key] = [...toArray(result[key]), ...toArray(value)];
      } else {
        result[key] = value;
      }
    }
  }
  return result;
};

const unwrapStubArray = <T>(x: T | T[]) =>
  Array.isArray(x) && x.length === 1 ? x[0] : x;

const parseHtmlEl = (
  $: CheerioAPI,
  el: Element,
  attrNames: AttrNames,
  depth: number,
): ParsedHtml => {
  if (depth > 20) {
    throw new Error("too deep");
  }
  const x = $(el);
  const [prop, type, content, attr] = parseAttr({ ...x.attr() }, attrNames);
  const children = overlay(
    x
      .children()
      .toArray()
      .map(y => parseHtmlEl($, y, attrNames, depth + 1)),
  );
  const text = x.text();
  return {
    [prop ?? "_"]: { type, content, attr, text, children },
  };
};

type JsonValue = string | undefined | { [k: string]: MaybeArray<JsonValue> };

const toJson = (
  arr: ParsedHtml[string],
  depth: number,
): MaybeArray<JsonValue> => {
  if (depth > 20) {
    throw new Error("too deep");
  }
  return unwrapStubArray(
    toArray(arr).map(({ type, content, attr, text, children }) => {
      if (content && text) {
        throw new Error(
          `AttrError: had both content, ${content}, and text, ${text}`,
        );
      }
      if (Object.keys(attr).length && Object.keys(children).length) {
        throw new Error(
          `AttrError: had both attr, ${JSON.stringify(attr)}, and children, ${JSON.stringify(children)}`,
        );
      }
      const simplifiedChildren = Object.fromEntries(
        Object.entries(children).map(([key, value]) => [
          key,
          toJson(value, depth + 1),
        ]),
      );
      const attrOrChildren = Object.keys(attr).length
        ? attr
        : simplifiedChildren;
      const typedAttrOrChildren = type
        ? { "@type": type, ...attrOrChildren }
        : attrOrChildren;
      const contentOrText = content ?? text;
      const data = Object.keys(typedAttrOrChildren).length
        ? typedAttrOrChildren
        : contentOrText;
      return data;
    }),
  );
};

export const htmlToJson = (html: string, schema: string) => {
  const $ = load(html);
  const styleDeps = {
    microdata: {
      attrNames: ["itemprop", "itemtype", "content", ["itemscope"]],
      parentPrefix: "https://schema.org/",
    },
    rdfa: {
      attrNames: ["property", "typeof", "content", ["vocab"]],
      parentPrefix: "",
    },
  } as const;
  for (const [style, deps] of Object.entries(styleDeps)) {
    const { attrNames, parentPrefix } = deps;
    const [, typeAttr] = attrNames;
    const [el] = $(`[${typeAttr}="${parentPrefix + schema}"]`).toArray();
    try {
      const data = toJson(parseHtmlEl($, el, attrNames, 0)._, 0);
      if (data) {
        return { style, data };
      }
    } catch (error) {
      if (`${error}`.includes("AttrError")) {
        console.log(`${style} parsing failed`);
      } else {
        throw error;
      }
    }
  }
  try {
    const [el] = $('script[type="application/ld+json"]');
    const data = JSON.parse($(el).text());
    if (data) {
      return { style: "ld", data };
    }
  } catch (ldError) {
    if (`${ldError}`.includes("AttrError")) {
      console.log("ld parsing failed");
    } else {
      throw ldError;
    }
  }
  throw new Error(
    `SchemaError: couldn't identify any style of ${schema} schema in the HTML`,
  );
};
