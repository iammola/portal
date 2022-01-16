import type { StatusCodes, ReasonPhrases } from "http-status-codes";

export type APIInternal<D, E> = ["", 0] | APIInternalResponse<D, E>;

export type APIInternalResponse<D, E> =
    | [APIError<E>, FilterNumber<`${StatusCodes}`>]
    | [APIResponse<D>, FilterNumber<`${StatusCodes}`>];

export interface APIData<S> {
    success: S;
    message: `${ReasonPhrases}`;
}

export interface APIResponse<D> extends APIData<true> {
    data: D;
}

export interface APIError<E> extends APIData<false> {
    error: E;
}

export type APIResult<D, E> = APIResponse<D> | APIError<E>;

/**
 * THese types create a number union from a string union
 * @see https://stackoverflow.com/a/69090186/15350139
 */
type RangeUnion<N extends number, R extends number[] = []> = R["length"] extends N
    ? R
    : RangeUnion<N, [...R, R["length"]]>;

type FilterNumber<S extends string, R extends number = RangeUnion<999>[number]> = R extends any
    ? `${R}` extends S
        ? R
        : never
    : never;
