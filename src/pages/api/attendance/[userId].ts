import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils";
import { AttendanceModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

async function createAttendance(
  userId: string,
  body: API.Attendance.POST.Body
): API.HandlerResponse<API.Attendance.POST.Data> {
  await connect();
  const res = await AttendanceModel.updateOne({ userId }, { $push: { dates: body } }, { upsert: true, fields: "_id" });

  return [
    {
      data: {
        _id: res.upsertedId as API.Attendance.POST.Data["_id"],
        success: res.acknowledged,
      },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: API.Handler<API.Attendance.POST.Data> = async ({ body, method, query }) => {
  if (["POST", "PUT"].includes(method ?? "") && typeof query.userId === "string" && typeof body === "string")
    return await createAttendance(query.userId, JSON.parse(body) as API.Attendance.POST.Body);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Attendance.POST.Data>(req, res, handler, ["POST", "PUT"]);
