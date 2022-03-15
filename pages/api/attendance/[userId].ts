import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils";
import { AttendanceModel } from "db/models";

import type {
  CreateAttendanceData as CreateData,
  CreateAttendanceRequestBody as CreateBody,
} from "types/api/attendance";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createAttendance(userId: string, body: CreateBody): MethodResponse<any> {
  await connect();
  const res = await AttendanceModel.updateOne(
    { userId },
    { $push: { dates: body } },
    { upsert: true, fields: "_id" }
  );

  return [
    {
      success: true,
      data: {
        _id: res.upsertedId,
        success: res.acknowledged,
      },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method, query }) => {
  if (
    ["POST", "PUT"].includes(method ?? "") &&
    typeof query.userId === "string" &&
    typeof body === "string"
  )
    return await createAttendance(query.userId, JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST", "PUT"]);