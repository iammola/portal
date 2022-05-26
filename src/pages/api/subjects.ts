import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { BaseSubjectModel, ClassModel, GroupSubjectModel, StaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Subject.POST.Data> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.body);

  return null;
};

async function POST(body: unknown): API.HandlerResponse<API.Subject.POST.Data> {
  const data = JSON.parse(body as string) as API.Subject.POST.Body;

  if (data.__type === "group" && data.divisions.length < 2) throw new Error("At least 2 divisions are required");

  const teachers = data.__type === "base" ? data.teachers : data.divisions.map((div) => div.teachers).flat();

  const [classExists, teacherIds] = await Promise.all([
    ClassModel.exists({ _id: data.class }),
    StaffModel.findByUsername(teachers, "username").lean(),
  ]);

  if (classExists == null) throw new Error("Specified class does not exists");

  const getTeachers = (teachers: string[]) =>
    teachers.map((username) => teacherIds.find((teacher) => `@${teacher.username}` === username)?._id).filter(Boolean);

  const { _id } =
    data.__type === "base"
      ? await BaseSubjectModel.create({
          ...data,
          teachers: getTeachers(teachers),
        })
      : await GroupSubjectModel.create({
          ...data,
          divisions: data.divisions.map((div) => ({ ...div, teachers: getTeachers(div.teachers) })),
        });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
