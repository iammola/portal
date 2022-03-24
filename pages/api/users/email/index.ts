import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { ParentModel, StudentModel, TeacherModel } from "db/models";

import type { UsersEmailData as UsersData, UsersEmailRequestBody as UsersBody } from "types/api/users/email";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function searchByEmail({ mail: schoolMail, select, userType }: UsersBody): MethodResponse<UsersData> {
  await connect();
  const args = [{ schoolMail }, select] as const;
  const data = await (userType === "student"
    ? StudentModel.findOne(...args).lean()
    : userType === "parent"
    ? ParentModel.findOne(...args).lean()
    : TeacherModel.findOne(...args).lean());

  if (data === null) throw new Error("User does not exist");

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<UsersData> = async ({ body, method }) => {
  if (method === "SEARCH" && typeof body === "string") return await searchByEmail(JSON.parse(body) as UsersBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<UsersData>(req, res, handler, ["SEARCH"]);
