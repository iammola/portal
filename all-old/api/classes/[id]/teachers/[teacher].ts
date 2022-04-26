import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel } from "db/models";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

type DeleteQuery = {
  id: string;
  teacher: string;
};

async function deleteTeacher(query: DeleteQuery): API.HandlerResponse<API.Class.DELETE.Teachers> {
  await connect();
  const upd = await ClassModel.updateOne({ _id: query.id }, { $pull: { teachers: query.teacher } });

  const message = upd.acknowledged
    ? upd.modifiedCount === 1
      ? "Success"
      : `Teacher ${query.teacher} is not assigned to class`
    : "Failed";
  const success = upd.acknowledged && upd.modifiedCount === 1;

  return [{ data: { success, message }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: API.Handler<API.Class.DELETE.Teachers> = async ({ query, method }) => {
  if (method === "DELETE") return await deleteTeacher(query as DeleteQuery);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Class.DELETE.Teachers>(req, res, handler, ["DELETE"]);