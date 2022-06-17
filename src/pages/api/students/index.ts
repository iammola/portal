import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "db/utils";
import { USER_ID_COOKIE } from "utils/constants";
import { routeWrapper, UnauthorizedError } from "api/server";
import { ClassModel, ParentModel, StudentModel, SubjectModel, StaffModel, TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Student.POST.Data> = async (req) => {
  if (req.method === "POST") {
    const privileged = await StaffModel.hasPrivileges(req.cookies[USER_ID_COOKIE], ["u.stu"]);
    if (!privileged) throw new UnauthorizedError("You are not privileged to create a student");

    return POST(req.body as API.Student.POST.Body);
  }

  return null;
};

async function POST(body: API.Student.POST.Body): API.HandlerResponse<API.Student.POST.Data> {
  const check = await Promise.all([
    StudentModel.exists({ username: body.username }),
    StaffModel.exists({ username: body.username }),
    ParentModel.exists({ username: body.username }),
  ]);

  if (check.every((_) => _ != null)) throw new Error(`A user with the username ${body.username} already exists`);

  if (isNaN(new Date(body.dob).getTime())) throw new Error("Invalid Date of Birth");

  if (body.academic.length > 0) {
    const academicData = body.academic.reduce<Record<"term" | "class" | "subjects", string[]>>(
      (acc, cur) => ({
        term: [...acc.term, cur.term],
        class: [...acc.class, cur.class],
        subjects: [...acc.subjects, ...cur.subjects],
      }),
      { term: [], class: [], subjects: [] }
    );

    const [terms, classes, subjects] = await Promise.all([
      TermModel.find({ _id: { $in: academicData.term } }, "_id").lean(),
      ClassModel.find({ _id: { $in: academicData.class } }, "_id").lean(),
      SubjectModel.find({ _id: { $in: academicData.subjects } }, "_id").lean(),
    ]);

    if (terms.length != academicData.term.length)
      throw new Error("One or more terms in the academic section does not exist");

    if (classes.length != academicData.class.length)
      throw new Error("One or more classes in the academic section does not exist");

    if (subjects.length != academicData.subjects.length)
      throw new Error("One or more subjects in the academic section does not exist");
  }

  if (body.guardians.length > 0) {
    const parents = await ParentModel.findByUsername(
      body.guardians.map((_) => _.guardian.split(" ", 1)).flat(),
      "name.username"
    ).lean();

    body.guardians = body.guardians.map((_) => ({
      relation: _.relation,
      guardian: parents.reduce<string>(
        (acc, cur) => (_.guardian.split(" ", 1)[0] === cur.username ? String(cur._id) : acc),
        ""
      ),
    }));
  }

  const response = await createUser("student", body);

  return [{ data: response, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
