import type { parseIngredient } from "./nlp";
import type { ExtractEndsWith } from "./types";

export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));


export const getKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as (string & keyof T)[];

export const keyValuesToObj = <K extends string, V>(
  keys: readonly K[],
  values: V[],
) => {
  const result: Partial<Record<K, V>> = {};
  for (const i in keys) {
    result[keys[i]] = values[i];
  }
  return result as Record<K, V>;
};

const overwrite = (x: string, overs: Record<string, string>) =>
  getKeys(overs).includes(x) ? overs[x] : x;

export const areDeepEqual = (a: unknown, b: unknown): boolean => {
  if (a && typeof a === "object" && b && typeof b === "object") {
    if (getKeys(a).length !== getKeys(b).length) {
      return false;
    }
    return getKeys(a).every(k => areDeepEqual(a[k], b[k]));
  }
  return a === b;
};

export const unique = <T>(items: T[]) => Array.from(new Set(items));

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

export const deepUnique = <T>(items: T[]) => {
  const result: T[] = [];
  for (const item of items) {
    if (result.every(x => !areDeepEqual(x, item))) {
      result.push(item);
    }
  }
  return result;
};

export const doesEndWith = <T extends string, S extends string>(
  text: T,
  sub: S,
): text is T & ExtractEndsWith<T, S> => text.endsWith(sub);

export const doesInclude = <T extends readonly string[]>(
  arr: T,
  x: string,
): x is T[number] => arr.includes(x);

// const doesDeepInclude = <T extends object[]>(
//   arr: T,
//   x: object,
// ): x is T[number] => arr.some(item => areDeepEqual(item, x));

// const pick = <T extends object, K extends string & keyof T>(
//   obj: T,
//   keys: K[],
// ) => {
//   const result: Partial<T> = {};
//   for (const k of getKeys(obj)) {
//     if (doesInclude(keys, k)) {
//       result[k] = obj[k];
//     }
//   }
//   return result as Pick<T, K>;
// };

export const omit = <T extends object, K extends string & keyof T>(
  obj: T,
  keys: K[],
) => {
  const result: Partial<T> = {};
  for (const k of getKeys(obj)) {
    if (!doesInclude(keys, k)) {
      result[k] = obj[k];
    }
  }
  return result as Omit<T, K>;
};

export const hasRequiredKeys = <T extends object, K extends string & keyof T>(
  obj: T,
  keys: K[],
): obj is T & Required<Pick<T, K>> => keys.every(k => obj[k] !== undefined);

export const overlap = <T>(a: T[], b: T[]) => a.filter(x => b.includes(x));

// const deepOverlap = <T extends object>(a: T[], b: T[]) =>
//   a.filter(x => doesDeepInclude(b, x));

const MY_TIME_PERIODS = ["y", "mo", "d", "h", "m", "s"] as const;

export const parseDur = (dur: string) => {
  const [period, time] = dur
    .toLowerCase()
    .split("t")
    .map(x =>
      Array.from(x.matchAll(/(\d+)([a-z,A-Z]+)/g)).map(m => ({
        num: parseInt(m[1]),
        label: m[2],
      })),
    );
  return {
    period,
    time,
    get: (label: (typeof MY_TIME_PERIODS)[number]) => {
      const quantity = ["h", "m", "s"].includes(label) ? time : period;
      const realLabel = overwrite(label, { mo: "m" });
      return (
        quantity.filter(
          x => x.label.toLowerCase() === realLabel.toLowerCase(),
        )[0]?.num ?? 0
      );
    },
  };
};

/**
 * Convert ISO durations to a concise readable form
 * @param dur [ISO 8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) e.g. `"P3Y6M4DT12H30M5S"`
 * @returns e.g.`"3y 6mo 4d 12h 30m 5s"`
 */
export const durToText = (dur: string | undefined) => {
  if (!dur) {
    return null;
  }
  const { period, time } = parseDur(dur);
  const pText = period
    .map(x => `${x.num}${overwrite(x.label, { p: "", m: "mo" })}`)
    .join(" ");
  const tText = time.map(x => `${x.num}${x.label}`).join(" ");
  return pText + tText;
};

export const toDur = (
  x: Partial<Record<(typeof MY_TIME_PERIODS)[number], number>>,
) => {
  const y = x.y ? `${x.y}Y` : "";
  const mo = x.mo ? `${x.mo}M` : "";
  const d = x.d ? `${x.d}D` : "";
  const h = x.h ? `${x.h}H` : "";
  const m = x.m ? `${x.m}M` : "";
  const s = x.s ? `${x.s}S` : "";
  return "P" + y + mo + d + "T" + h + m + s;
};

const quotientAndRemainder = (
  numerator: number,
  denominator: number,
): [number, number] => [
  Math.floor(numerator / denominator),
  numerator % denominator,
];

const rollover = (x: Record<(typeof MY_TIME_PERIODS)[number], number>) => {
  const [mFromS, s] = quotientAndRemainder(x.s, 60);
  const [hFromM, m] = quotientAndRemainder(x.m + mFromS, 60);
  const [dFromH, h] = quotientAndRemainder(x.h + hFromM, 24);
  const d = x.d + dFromH;
  return { y: x.y, mo: x.mo, d, h, m, s };
};

const transpose = (x: number[][]) => x[0].map((_, i) => x.map(row => row[i]));

export const sum = (x: number[]) =>
  x.map(a => (isNaN(a) ? 0 : a)).reduce((a, b) => a + b);

/**
 * Add arrays like rows on a spread sheet
 * @param rows the rows, e.g. `[[1,2,3], [0,6,1]]`
 * @returns the sums, e.g. `[1,8,4]`
 */
const addRows = (rows: number[][]) => transpose(rows).map(sum);

export const addDurations = (durations: (string | undefined)[]) => {
  const rows = durations.map(d =>
    MY_TIME_PERIODS.map(x => parseDur(d ?? "").get(x)),
  );
  const sums = addRows(rows);
  return toDur(rollover(keyValuesToObj(MY_TIME_PERIODS, sums)));
};

/**
 * Convert ISO date to two readable forms
 * @param date [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) e.g. `"2001-02-03T01:02:03+01:00"`
 * @returns both the `month` of the date, e.g. `"Feb 2001"`, and the more `full` date-time string in current locale format, e.g. `"00:02:03 03/02/2001"`
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

export const decimalToString = (x: number) => {
  const regular = x.toString();
  const precise = x.toFixed(2);
  return regular.length < precise.length ? regular : precise;
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

// const fetchImage = async (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.onload = () => resolve(image);
//     image.onerror = error => reject(error);
//     image.src = url;
//   });

export const debounce = (
  time: number,
  f: () => Promise<void>,
): (() => Promise<void>) => {
  let timeoutId: number = NaN;
  return () =>
    new Promise((resolve, reject) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(
        () => f().then(resolve).catch(reject),
        time,
      );
    });
};
