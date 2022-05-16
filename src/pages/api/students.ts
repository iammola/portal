import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { createUser } from "db/utils";
import { ClassModel, ParentModel, StudentModel, SubjectModel, TeacherModel, TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Student.POST.Data> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.body);

  return null;
};

async function POST(body: unknown): API.HandlerResponse<API.Student.POST.Data> {
  const data = JSON.parse(body as string) as API.Student.POST.Body;

  const check = await Promise.all([
    StudentModel.exists({ "name.username": data.name.username }),
    TeacherModel.exists({ "name.username": data.name.username }),
    ParentModel.exists({ "name.username": data.name.username }),
  ]);

  if (check.every((_) => _ != null)) throw new Error(`A user with the username ${data.name.username} already exists`);

  if (isNaN(new Date(data.dob).getTime())) throw new Error("Invalid Date of Birth");

  if (data.academic.length > 0) {
    const academicData = data.academic.reduce<Record<"term" | "class" | "subjects", string[]>>(
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

  if (data.guardians.length > 0) {
    const parents = await ParentModel.findByUsername(
      data.guardians.map((_) => _.guardian.split(" ", 1)).flat(),
      "name.username"
    ).lean();

    data.guardians = data.guardians.map((_) => ({
      relation: _.relation,
      guardian: parents.reduce<string>(
        (acc, cur) => (_.guardian.split(" ", 1)[0] === cur.name.username ? String(cur._id) : acc),
        ""
      ),
    }));
  }

  const response = await createUser("student", data);

  return [{ data: response, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, []);
