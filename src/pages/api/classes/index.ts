import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { ClassModel, TeacherStaffModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Class.POST.Data | API.Class.GET.AllData> = async (req) => {
  await connect();

  if (req.method === "POST") return POST(req.body as API.Class.POST.Body);
  if (req.method === "GET") return GET();

  return null;
};

async function GET(): API.HandlerResponse<API.Class.GET.AllData> {
  const classes = await ClassModel.find({})
    .populate<{ subjectsCount: number }>("subjectsCount")
    .sort({ order: "asc" })
    .lean();

  return [{ data: classes, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function POST({ teachers, name }: API.Class.POST.Body): API.HandlerResponse<API.Class.POST.Data> {
  const checks = await Promise.all([
    ClassModel.exists({ "name.long": name.long }),
    ClassModel.exists({ "name.short": name.short }),
    name.special && ClassModel.exists({ "name.special": name.special }),
  ]);

  if (checks[0] != null) throw new Error(`A class with name ${name.long} already exists`);
  if (checks[1] != null) throw new Error(`A class with alias ${name.short} already exists`);
  if (name.special && checks[2] != null) throw new Error(`A class with special name ${name.special} already exists`);

  const teacherIDs = await TeacherStaffModel.findByUsername(teachers, "_id").lean();
  const { _id, createdAt } = await ClassModel.create({
    name,
    teachers: teacherIDs.map((t) => t._id),
  });

  return [{ data: { _id, createdAt }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET", "POST"]);
