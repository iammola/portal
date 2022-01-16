import type { StatusCodes, ReasonPhrases } from "http-status-codes";

export type ApiInternal<D, E> = ["", 0] | ApiInternalResponse<D, E>;

export type ApiInternalResponse<D, E> =
    | [ApiError<E>, FilterNumber<`${StatusCodes}`>]
    | [ApiResponse<D>, FilterNumber<`${StatusCodes}`>];

export interface ApiData<S> {
    success: S;
    message: `${ReasonPhrases}`;
}

export interface ApiResponse<D> extends ApiData<true> {
    data: D;
}

export interface ApiError<E> extends ApiData<false> {
    error: E;
}

export type ApiResult<D, E> = ApiResponse<D> | ApiError<E>;

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
