import { CookieSerializeOptions } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { DocumentId } from "types/schema";
import { FilterNumber } from "types/utils";

export type CreateResult<O = unknown> = DocumentId & O;
export type DeleteResult = Record<"success", boolean>;
export type UpdateResult = Record<"success", boolean>;

type ResponseCodes = FilterNumber<`${StatusCodes}`>;

export type HandlerResponse<D> = Promise<[Omit<ApiResponse<D>, "success">, ResponseCodes]>;

export type RouteResponse<D> = [ApiError, ResponseCodes] | Awaited<HandlerResponse<D>>;

export type ApiHandler<R extends object> = (
  req: NextApiRequest,
  res: NextAPIResponse<ApiError | ApiResponse<R>>
) => Promise<Awaited<HandlerResponse<R>> | null>;

interface ApiData<S> {
  success: S;
  message: `${ReasonPhrases}`;
}

export interface ApiResponse<D> extends ApiData<true> {
  data: D;
}

export interface ApiError extends ApiData<false> {
  error: string | Record<string, string | undefined>;
}

export type ApiResult<D> = ApiResponse<D> | ApiError;

export interface NextAPIResponse<T = unknown> extends NextApiResponse<T> {
  /**
   * Helper method to serialize a cookie name-value pair into a `Set-Cookie` header string
   *
   * @param name the name for the cookie
   * @param value value to set the cookie to
   * @param opts object containing serialization options
   */
  cookie(name: string, value: unknown, opts?: CookieSerializeOptions): void;
}

export * from "./auth";
export * from "./terms";
export * from "./classes";
export * from "./parents";
export * from "./sessions";
export * from "./students";
export * from "./subjects";
export * from "./teachers";
export * from "./attendance";
