import type { StatusCodes, ReasonPhrases } from "http-status-codes";
import type { DocumentId } from "types/schema";
import type { FilterNumber } from "types/utils";

export type CreateResult<O = unknown> = DocumentId & O;
export type DeleteResult = Record<"success", boolean>;
export type UpdateResult = Record<"success", boolean>;

export type ApiInternal<D> = ["", 0] | ApiInternalResponse<D>;

export type ApiInternalResponse<D> =
  | [ApiError, FilterNumber<`${StatusCodes}`>]
  | [ApiResponse<D>, FilterNumber<`${StatusCodes}`>];

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
