import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ParentModel } from "db/models";
import { createUser, routeWrapper } from "utils/api";

import type {
  CreateStudentData as CreateData,
  CreateStudentRequestBody as CreateBody,
} from "types/api/students";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createStudent(raw: CreateBody): MethodResponse<CreateData> {
  await connect();

  const parents = await ParentModel.find(
    { schoolMail: raw.guardians.map((g) => g.mail) },
    "schoolMail"
  ).lean();

  const body = {
    ...raw,
    academic: [],
    guardians: parents.map((p) => ({
      guardian: p._id,
      relation: raw.guardians.find((g) => g.mail === p.schoolMail)?.relation,
    })),
  };

  return [
    {
      success: true,
      message: ReasonPhrases.CREATED,
      data: await createUser("student", body),
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
