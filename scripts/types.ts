import { Call, Fn } from "hotscript";

// schemas

type SimpleTypes =
  | { type: "boolean" | "number" | "string" }
  | { $ref: `schema:${string}` };

type Nest<T> =
  | T
  | { type: "array"; items: T }
  | { anyOf: T[] }
  | { oneOf: T[] };

// type SchemaType = Nest<Nest<Nest<Nest<SimpleTypes>>>>;
type SchemaType = Nest<Nest<SimpleTypes>>;

export interface SchemaOrg {
  $schema: string;
  $id: `schema:${string}`;
  title: string;
  description: string;
  type: "object";
  allOf?: { description: string; $ref: `schema:${string}` }[];
  properties: Record<string, { description: string } & SchemaType>;
}

type Base = Omit<SchemaOrg, "$schema" | "allOf">;
export type BundledSchema = Base & { allOf?: Base[] };
// export type BundledSchema = Base & {
//   allOf?: (Base & { allOf?: (Base & { allOf?: Base[] })[] })[];
// };

// helpers

export type R = Record<string, unknown>;

export type PartialKey<T extends R, K extends string> = Omit<T, K> &
  Partial<Pick<T, K>>;

interface PartialKeyFn<K extends string> extends Fn {
  return: this["args"] extends [infer value extends R]
    ? PartialKey<value, K>
    : never;
}

interface DeepPartialKeyFn<K extends string> extends Fn {
  return: this["args"] extends [infer obj]
    ? TransformObjectDeep<PartialKeyFn<K>, obj>
    : never;
}

export type DeepPartialKey<T extends R, K extends string> = Call<
  DeepPartialKeyFn<K>,
  T
>;

type OverwriteKey<T extends R, K extends string, V> = Omit<T, K> & Record<K, V>;

interface OverwriteKeyFn<K extends string, V> extends Fn {
  return: this["args"] extends [infer value extends R]
    ? OverwriteKey<value, K, V>
    : never;
}

interface DeepOverwriteKeyFn<K extends string, V> extends Fn {
  return: this["args"] extends [infer obj]
    ? TransformObjectDeep<OverwriteKeyFn<K, V>, obj>
    : never;
}

export type DeepOverwriteKey<T extends R, K extends string, V> = Call<
  DeepOverwriteKeyFn<K, V>,
  T
>;

// --- from hotscript ---

type IsTuple<a extends readonly any[]> = a extends
  | readonly []
  | readonly [any, ...any]
  | readonly [...any, any]
  ? true
  : false;

type Equal<a, b> =
  (<T>() => T extends a ? 1 : 2) extends <T>() => T extends b ? 1 : 2
    ? true
    : false;

type TransformObjectDeep<fn extends Fn, type> = type extends Function | Date
  ? type
  : type extends Map<infer keys, infer values>
    ? Map<TransformObjectDeep<fn, keys>, TransformObjectDeep<fn, values>>
    : type extends ReadonlyMap<infer keys, infer values>
      ? ReadonlyMap<
          TransformObjectDeep<fn, keys>,
          TransformObjectDeep<fn, values>
        >
      : type extends WeakMap<infer keys, infer values>
        ? WeakMap<
            Extract<TransformObjectDeep<fn, keys>, object>,
            TransformObjectDeep<fn, values>
          >
        : type extends Set<infer values>
          ? Set<TransformObjectDeep<fn, values>>
          : type extends ReadonlySet<infer values>
            ? ReadonlySet<TransformObjectDeep<fn, values>>
            : type extends WeakSet<infer values>
              ? WeakSet<Extract<TransformObjectDeep<fn, values>, object>>
              : type extends Array<infer values>
                ? IsTuple<type> extends true
                  ? Call<
                      fn,
                      {
                        [Key in keyof type]: TransformObjectDeep<fn, type[Key]>;
                      }
                    >
                  : Array<TransformObjectDeep<fn, values>> // edited
                : type extends Promise<infer value>
                  ? Promise<TransformObjectDeep<fn, value>>
                  : type extends object
                    ? Call<
                        fn,
                        {
                          [Key in keyof type]: TransformObjectDeep<
                            fn,
                            type[Key]
                          >;
                        }
                      >
                    : Equal<type, unknown> extends true
                      ? unknown
                      : Partial<type>;
