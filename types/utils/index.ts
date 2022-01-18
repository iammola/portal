/**
 * These types create a number union from a string union
 * @see https://stackoverflow.com/a/69090186/15350139
 */
type RangeUnion<N extends number, R extends number[] = []> = R["length"] extends N
    ? R
    : RangeUnion<N, [...R, R["length"]]>;

export type FilterNumber<
    S extends string,
    R extends number = RangeUnion<999>[number]
> = R extends any ? (`${R}` extends S ? R : never) : never;
