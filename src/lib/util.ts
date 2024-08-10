export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const toArray = <T>(x: T | T[] | undefined | null) =>
  x === undefined || x === null ? [] : Array.isArray(x) ? x : [x];

export const getKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as (string & keyof T)[];

export const keyValuesToObj = <K extends string, V>(keys: K[], values: V[]) => {
  const result: Partial<Record<K, V>> = {};
  for (const i in keys) {
    result[keys[i]] = values[i];
  }
  return result;
};

const overwrite = (x: string, overs: Record<string, string>) =>
  getKeys(overs).includes(x) ? overs[x] : x;

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

export const overlap = <T>(a: T[], b: T[]) => a.filter(x => b.includes(x));

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

export const fetchImage = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = error => reject(error);
    image.src = url;
  });
