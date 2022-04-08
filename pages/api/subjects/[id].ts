import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { BaseSubjectModel, GroupSubjectModel, SubjectModel } from "db/models";

import type {
  ApiHandler,
  DeleteSubjectData as DeleteData,
  HandlerResponse,
  UpdateSubjectData as UpdateData,
  UpdateSubjectRequestBody as UpdateBody,
} from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

type D = DeleteData | UpdateData;

async function deleteSubject(_id: string): HandlerResponse<DeleteData> {
  await connect();
  const res = await SubjectModel.deleteOne({ _id });

  return [{ data: { success: res.acknowledged }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function updateSubject(_id: string, data: UpdateBody): HandlerResponse<UpdateData> {
  await connect();
  const args = [
    _id,
    data,
    {
      fields: "_id",
      runValidators: true,
    },
  ] as const;

  const res = await (data.__type === "base"
    ? BaseSubjectModel.findByIdAndUpdate(...args).lean()
    : GroupSubjectModel.findByIdAndUpdate(...args).lean());

  return [{ data: { success: !!res?._id }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: ApiHandler<D> = async ({ body, method, query }) => {
  const { id } = query as Record<string, string>;

  if (method === "DELETE") return await deleteSubject(id);

  if (method === "PUT" && typeof body === "string") return await updateSubject(id, JSON.parse(body) as UpdateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<D>(req, res, handler, ["DELETE", "PUT"]);
