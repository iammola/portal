import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { BaseSubjectModel, ClassModel, GroupSubjectModel, TeacherStaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Subject.POST.Data> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.body as API.Subject.POST.Body);

  return null;
};

async function POST(body: API.Subject.POST.Body): API.HandlerResponse<API.Subject.POST.Data> {
  if (body.__type === "group" && body.divisions.length < 2) throw new Error("At least 2 divisions are required");

  const teachers = body.__type === "base" ? body.teachers : body.divisions.map((div) => div.teachers).flat();

  const [classExists, teacherIds] = await Promise.all([
    ClassModel.exists({ _id: body.class }),
    TeacherStaffModel.findByUsername(teachers, "username").lean(),
  ]);

  if (classExists == null) throw new Error("Specified class does not exists");

  const getTeachers = (teachers: string[]) =>
    teachers.map((username) => teacherIds.find((teacher) => `@${teacher.username}` === username)?._id).filter(Boolean);

  const { _id } =
    body.__type === "base"
      ? await BaseSubjectModel.create({
          ...body,
          teachers: getTeachers(teachers),
        })
      : await GroupSubjectModel.create({
          ...body,
          divisions: body.divisions.map((div) => ({ ...div, teachers: getTeachers(div.teachers) })),
        });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
