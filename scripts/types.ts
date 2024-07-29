import { Call, Fn } from "hotscript";

export type R = Record<string, unknown>;

export type PartialKey<T extends R, K extends string> = Omit<T, K> &
  Partial<Pick<T, K>>;

interface MyFn<K extends string> extends Fn {
  return: this["args"] extends [infer value extends R]
    ? PartialKey<value, K>
    : never;
}

interface MyDeepFn<K extends string> extends Fn {
  return: this["args"] extends [infer obj]
    ? TransformObjectDeep<MyFn<K>, obj>
    : never;
}

export type DeepPartialKey<T extends R, K extends string> = Call<
  MyDeepFn<K>,
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
                  : Array<TransformObjectDeep<fn, values> | undefined>
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
