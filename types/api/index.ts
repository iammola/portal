import type { StatusCodes, ReasonPhrases } from "http-status-codes";
import type { FilterNumber } from "types/utils";

export type ApiInternal<D, E = Record<string, string | undefined>> =
    | ["", 0]
    | ApiInternalResponse<D, E>;

export type ApiInternalResponse<D, E = Record<string, string | undefined>> =
    | [ApiError<E>, FilterNumber<`${StatusCodes}`>]
    | [ApiResponse<D>, FilterNumber<`${StatusCodes}`>];

export interface ApiData<S> {
    success: S;
    message: `${ReasonPhrases}`;
}

export interface ApiResponse<D> extends ApiData<true> {
    data: D;
}

export interface ApiError<E = Record<string, string | undefined>> extends ApiData<false> {
    error: `${ReasonPhrases}` | E;
}

export type ApiResult<D, E = Record<string, string | undefined>> = ApiResponse<D> | ApiError<E>;
