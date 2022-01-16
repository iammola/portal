import type { StatusCodes, ReasonPhrases } from "http-status-codes";

export type APIInternal<D, E> =
    | ["", 0]
    | [APIError<E>, `${StatusCodes}`]
    | [APIResponse<D>, `${StatusCodes}`];

export interface APIData<S> {
    success: S;
    message: `${ReasonPhrases}`;
}

export interface APIResponse<D, S extends boolean = never> extends APIData<S> {
    data: D;
}

export interface APIError<E, S extends boolean = never> extends APIData<S> {
    error: E;
}

export type APIResult<D, E> = APIResponse<D, true> | APIError<E, false>;
