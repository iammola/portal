import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { generateSchoolMail } from "utils/email";
import { ParentModel, StudentModel } from "db/models";

import type {
  CreateStudentData as CreateData,
  CreateStudentRequestBody as CreateBody,
} from "types/api/students";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createStudent({
  academic: _a,
  guardians,
  ...data
}: CreateBody): MethodResponse<CreateData> {
  await connect();

  const parents = await ParentModel.find(
    {
      schoolMail: guardians.map((g) => g.mail),
    },
    "schoolMail"
  ).lean();

  const { _id, schoolMail } = await StudentModel.create({
    ...data,
    schoolMail: generateSchoolMail(data.name.username),
    guardians: parents.map((p) => ({
      guardian: p._id,
      relation: guardians.find((g) => g.mail === p.schoolMail)?.relation,
    })),
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
    return await createStudent(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
