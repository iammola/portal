import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "db/utils";
import { USER_ID_COOKIE } from "utils/constants";
import { routeWrapper, UnauthorizedError } from "api/server";
import { ClassModel, StudentModel, StaffModel, ParentModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Staff.POST.Data> = async (req) => {
  if (req.method === "POST") {
    const privileged = await StaffModel.hasPrivileges(req.cookies[USER_ID_COOKIE], ["u.sta"]);
    if (!privileged) throw new UnauthorizedError("You are not privileged to create a staff");

    return POST(req.body as API.Staff.POST.Body);
  }

  return null;
};

async function POST({ classes, __type, ...body }: API.Staff.POST.Body): API.HandlerResponse<API.Staff.POST.Data> {
  const check = await Promise.all([
    StudentModel.exists({ username: body.username }),
    StaffModel.exists({ username: body.username }),
    ParentModel.exists({ username: body.username }),
  ]);

  if (check.every((_) => _ != null)) throw new Error(`A user with the username ${body.username} already exists`);

  const validStaffType = ["teacher"] as Array<typeof __type>;
  if (!validStaffType.includes(__type)) throw new Error("Invalid Staff Type");

  const response = await createUser(`staff-${__type}`, body, async (session, _id) => {
    if (!_id) return;
    await ClassModel.updateMany({ _id: { $in: classes ?? [] } }, { $addToSet: { teachers: _id } }, { session });
  });

  return [{ data: response, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
