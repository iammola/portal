import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { DocumentId } from "types/schema";
import { FilterNumber } from "types/utils";

export type CreateResult<O = unknown> = DocumentId & O;
export type DeleteResult = Record<"success", boolean>;
export type UpdateResult = Record<"success", boolean>;

type ResponseCodes = FilterNumber<`${StatusCodes}`>;

export type MethodResponse<D> = Promise<[ApiResponse<D>, ResponseCodes]>;

export type HandlerResponse<D> = [ApiError, ResponseCodes] | Awaited<MethodResponse<D>>;

export type ApiHandler<R extends object> = (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ApiResponse<R>>
) => Promise<HandlerResponse<R> | null>;

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
