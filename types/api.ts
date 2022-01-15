// Todo: Force the `number` types to be valid `http-status-codes` types
export type APIInternal<D, E> =
    | ["", 0, null]
    | [Omit<APIError<E>, "success">, number, false]
    | [Omit<APIResponse<D>, "success">, number, true];

export interface APIData<S> {
    success: S;
    message: string; // Todo: Force to be valid `http-status-codes` types
}

export interface APIResponse<D, S extends boolean = never> extends APIData<S> {
    data: D;
}

export interface APIError<E, S extends boolean = never> extends APIData<S> {
    error: E;
}

export type APIResult<D, E> = APIResponse<D, true> | APIError<E, false>;
