import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";
import { ClassModel, ParentModel, TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

async function createStudent(body: API.Student.POST.Body): API.HandlerResponse<API.Student.POST.Data> {
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

  const { _id, schoolMail } = await createUser("student", {
    ...body,
    academic: [{ term: term?._id, ...body.academic }],
    guardians: parents.map((p) => ({
      guardian: p._id,
      relation: body.guardians.find((g) => g.mail === p.schoolMail)?.relation,
    })),
  });

  return [{ data: { _id, schoolMail }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

const handler: API.Handler<API.Student.POST.Data> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createStudent(JSON.parse(body) as API.Student.POST.Body);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Student.POST.Data>(req, res, handler, ["POST"]);
