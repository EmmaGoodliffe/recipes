import type { Call, Objects, Pipe, Strings, Tuples, Unions } from "hotscript";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Func<P extends unknown[] = any[], R = any> = (...args: P) => R;

// type JsonValue =
//   | number
//   | string
//   | undefined
//   | JsonValue[]
//   | { [k: string]: JsonValue };

// type Json = Record<string, JsonValue>;

export type ExtractEndsWith<T extends string, S extends string> = Pipe<
  T,
  [Unions.ToTuple, Tuples.Filter<Strings.EndsWith<S>>, Tuples.ToUnion]
>;

export type PickThenPartialDeep<T, K extends keyof T> = {
  [P in K]: Call<Objects.PartialDeep, T[P]>;
};

export const toArray = <T>(x: T | T[] | undefined | null) =>
  x === undefined || x === null ? [] : Array.isArray(x) ? x : [x];

export const isRecord = (x: unknown): x is Record<string, unknown> =>
  !!x && typeof x === "object" && !Array.isArray(x);

export const deepOmitUndefined = <T, S extends Record<string, T>>(obj: S): S =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) =>
        isRecord(v)
          ? [k, deepOmitUndefined(v)]
          : Array.isArray(v)
            ? [k, v.map(x => (isRecord(x) ? deepOmitUndefined(x) : x))]
            : [k, v],
      ),
  );
