export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const toArray = <T>(x: T | T[] | undefined | null) =>
  x === undefined || x === null ? [] : Array.isArray(x) ? x : [x];

const isRecord = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);

const keyValuesToObj = <K extends string, V>(keys: K[], values: V[]) => {
  const result: Partial<Record<K, V>> = {};
  for (const i in keys) {
    result[keys[i]] = values[i];
  }
  return result;
};

export const getKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as (string & keyof T)[];

const isKey = <T extends object>(
  obj: T,
  key: string,
): key is string & keyof T => Object.keys(obj).includes(key);

export const getByPath = (obj: unknown, path: string | undefined): unknown => {
  if (!path || !obj) {
    return obj;
  }
  const [parentPath, ...childPaths] = path.split(".");
  if (typeof obj === "object" && isKey(obj, parentPath)) {
    return getByPath(obj[parentPath], childPaths.join("."));
  }
  throw new Error(`tried to get path ${path} of object with keys ${Object.keys(obj)}`);
};

const setByPath = (obj_: unknown, path: string, value: unknown): unknown => {
  if (!path || !obj_) {
    return value;
  }
  if (typeof obj_ !== "object") {
    throw new Error(`cannot set path ${path} of object ${obj_} to ${value}`);
  }
  const [parentPath, ...childPaths] = path.split(".");
  if (Array.isArray(obj_)) {
    const obj = [...obj_];
    const i = parseInt(parentPath);
    if (isNaN(i)) {
      throw new Error(
        `expected ${parentPath} to be a number because it indexes an array`,
      );
    }
    obj[i] = setByPath(obj[i], childPaths.join("."), value);
    return [...obj];
  }
  const obj: Record<string, unknown> = { ...obj_ };
  return {
    ...obj,
    [parentPath]: setByPath(obj[parentPath], childPaths.join("."), value),
  };
};

export const toEditable = <T extends object>(
  obj: T,
  isT: (x: unknown) => x is T,
) => ({
  initial: obj,
  data: { ...obj },
  unread: new Set(getKeys(obj)),
  get<K extends string & keyof T>(key: K) {
    this.unread.delete(key);
    return this.data[key];
  },
  set<K extends string & keyof T>(key: K, value: T[K]) {
    this.data[key] = value;
    return this.data;
  },
  getUnread() {
    const keys = Array.from(this.unread);
    return keyValuesToObj(
      keys,
      keys.map(k => this.data[k]),
    );
  },
  setByPath(path: string, value: unknown) {
    const x = setByPath(this.data, path, value);
    if (isRecord(x) && isT(x)) {
      this.data = x;
      return this.data;
    }
    throw new Error(`couldn't set data to ${x} of type ${typeof x}`);
  },
});

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
