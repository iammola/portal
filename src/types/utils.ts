export {};

declare global {
  namespace Utils {
    /**
     * These types create a number union from a string union
     * @see https://stackoverflow.com/a/69090186/15350139
     */
    type RangeUnion<N extends number, R extends number[] = []> = R["length"] extends N
      ? R
      : RangeUnion<N, [...R, R["length"]]>;

    type FilterNumber<S extends string, R extends number = RangeUnion<999>[number]> = R extends unknown
      ? `${R}` extends S
        ? R
        : never
      : never;

    /**
     * These types merge an Intersection to a single object
     * @see https://stackoverflow.com/a/63542565/15350139
     */
    type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

    type FlattenIntersection<U> = UnionToIntersection<U> extends infer O ? { [K in keyof O]: O[K] } : never;

    type OneKey<V, K extends keyof V = keyof V> = {
      [P in K]: FlattenIntersection<Record<P, V[P]> & Partial<Record<Exclude<K, P>, never>>>;
    }[K];
  }
}
