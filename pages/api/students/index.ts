import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";
import { ClassModel, ParentModel, TermModel } from "db/models";

import type {
  CreateStudentData as CreateData,
  CreateStudentRequestBody as CreateBody,
} from "types/api/students";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createStudent(body: CreateBody): MethodResponse<CreateData> {
  await connect();

  const [parents, term, classExists] = await Promise.all([
    ParentModel.findBySchoolMail(
      body.guardians.map((g) => g.mail),
      "schoolMail"
    ).lean(),
    TermModel.findCurrent("_id").lean(),
    ClassModel.exists({ _id: body.academic.class }),
  ]);

  if (term === null) throw new Error("Current term is not defined");

  if (classExists === null) throw new Error("Class does not exist");

  return [
    {
      success: true,
      message: ReasonPhrases.CREATED,
      data: await createUser("student", {
        ...body,
        academic: [{ term: term?._id, ...body.academic }],
        guardians: parents.map((p) => ({
          guardian: p._id,
          relation: body.guardians.find((g) => g.mail === p.schoolMail)?.relation,
        })),
      }),
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
