import type { StatusCodes, ReasonPhrases } from "http-status-codes";
import type { FilterNumber } from "types/utils";

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
