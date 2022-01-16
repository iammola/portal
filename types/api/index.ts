import type { StatusCodes, ReasonPhrases } from "http-status-codes";

export type APIInternal<D, E> =
    | ["", 0]
    | [APIError<E>, `${StatusCodes}`]
    | [APIResponse<D>, `${StatusCodes}`];

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
