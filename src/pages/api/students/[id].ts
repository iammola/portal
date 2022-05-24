import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { USER_ID_COOKIE } from "utils";
import { StudentModel, TeacherModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Student.DELETE.Data> = async (req) => {
  await connect();

  const userId = req.cookies[USER_ID_COOKIE];
  if (req.method === "DELETE") return DELETE(req.query.id, userId);

  return null;
};

async function DELETE(id: unknown, userId: string): API.HandlerResponse<API.Student.DELETE.Data> {
  const teacher = await TeacherModel.findById(userId, "privileges").lean(); // TODO: Check the teacher privileges

  // TODO: Check Privileges
  if (teacher == null) throw new Error("Unauthorized to complete this request");

  const { deletedCount: count, acknowledged: success } = await StudentModel.deleteOne({ _id: id });

  return [{ data: { count, success }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["DELETE"]);
