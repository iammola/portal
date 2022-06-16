import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { USER_ID_COOKIE } from "utils/constants";
import { StaffModel, StudentModel } from "db/models";
import { routeWrapper, UnauthorizedError } from "api/server";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Student.DELETE.Data> = async (req) => {
  if (req.method === "DELETE") {
    const privileged = await StaffModel.hasPrivileges(req.cookies[USER_ID_COOKIE], ["u.stu"]);
    if (!privileged) throw new UnauthorizedError("You are not privileged to delete a student");

    return DELETE(req.query.id);
  }

  return null;
};

async function DELETE(id: unknown): API.HandlerResponse<API.Student.DELETE.Data> {
  const { deletedCount: count, acknowledged: success } = await StudentModel.deleteOne({ _id: id });

  return [{ data: { count, success }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["DELETE"]);
