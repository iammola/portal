import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { BaseSubjectModel, GroupSubjectModel, SubjectModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

type D = API.Subject.DELETE.Data | API.Subject.PUT.Data;

async function deleteSubject(_id: string): API.HandlerResponse<API.Subject.DELETE.Data> {
  await connect();
  const res = await SubjectModel.deleteOne({ _id });

  return [{ data: { success: res.acknowledged }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function updateSubject(_id: string, data: API.Subject.PUT.Body): API.HandlerResponse<API.Subject.PUT.Data> {
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

const handler: API.Handler<D> = async ({ body, method, query }) => {
  const { id } = query as Record<string, string>;

  if (method === "DELETE") return await deleteSubject(id);

  if (method === "PUT" && typeof body === "string")
    return await updateSubject(id, JSON.parse(body) as API.Subject.PUT.Body);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<D>(req, res, handler, ["DELETE", "PUT"]);
