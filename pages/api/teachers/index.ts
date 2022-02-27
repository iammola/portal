import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { TeacherModel } from "db/models";
import { generateSchoolMail } from "utils";

import type {
  CreateTeacherData as CreateData,
  CreateTeacherRequestBody as CreateBody,
} from "types/api/teachers";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createTeacher(data: CreateBody): MethodResponse<CreateData> {
  await connect();
  const { _id, schoolMail } = await TeacherModel.create({
    ...data,
    schoolMail: generateSchoolMail(data.name.username),
  });

  return [
    {
      success: true,
      data: { _id, schoolMail },
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createTeacher(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
