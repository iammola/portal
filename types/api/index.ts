import type { DocumentId } from "types/schema";
import type { FilterNumber } from "types/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import type { StatusCodes, ReasonPhrases } from "http-status-codes";

export type CreateResult<O = unknown> = DocumentId & O;
export type DeleteResult = Record<"success", boolean>;
export type UpdateResult = Record<"success", boolean>;

export type HandlerResponse<D> =
  | [ApiError, FilterNumber<`${StatusCodes}`>]
  | [ApiResponse<D>, FilterNumber<`${StatusCodes}`>];

export type ApiHandler<R extends object> = (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ApiResponse<R>>
) => Promise<HandlerResponse<R> | null>;

export interface ApiData<S> {
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
