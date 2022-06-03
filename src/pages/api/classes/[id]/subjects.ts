import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api/server";
import { BaseSubjectModel, ClassModel, GroupSubjectModel, SubjectModel, TeacherStaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Class.GET.Subjects | API.Class.POST.Subjects.Data> = async (req) => {
  await connect();
  if (req.method === "GET") return GET(req.query.id);
  if (req.method === "POST") return POST(req.query.id, req.body as API.Class.POST.Subjects.Body);

  return null;
};

async function GET(id: unknown): API.HandlerResponse<API.Class.GET.Subjects> {
  const data = await SubjectModel.find({ class: id }, "-class -teachers -divisions.teacher")
    .sort({ order: "asc" })
    .lean<API.Class.GET.Subjects>({ getters: true });

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function POST(
  classId: unknown,
  body: API.Class.POST.Subjects.Body
): API.HandlerResponse<API.Class.POST.Subjects.Data> {
  if (body.__type === "group" && body.divisions.length < 2) throw new Error("At least 2 divisions are required");

  const teachers = body.__type === "base" ? body.teachers : body.divisions.map((div) => div.teachers).flat();

  const [classExists, teacherIds] = await Promise.all([
    ClassModel.exists({ _id: classId }),
    TeacherStaffModel.findByUsername(teachers, "username").lean(),
  ]);

  if (classExists == null) throw new Error("Specified class does not exists");

  const getTeachers = (teachers: string[]) =>
    teachers.map((username) => teacherIds.find((teacher) => `@${teacher.username}` === username)?._id).filter(Boolean);

  const { _id } =
    body.__type === "base"
      ? await BaseSubjectModel.create({
          ...body,
          class: classId,
          teachers: getTeachers(teachers),
        })
      : await GroupSubjectModel.create({
          ...body,
          class: classId,
          divisions: body.divisions.map((div) => ({ ...div, teachers: getTeachers(div.teachers) })),
        });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET", "POST"]);
