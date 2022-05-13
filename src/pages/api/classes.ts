import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { ClassModel, TeacherModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<object> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.body);

  return null;
};

async function POST(body: unknown): API.HandlerResponse<API.Class.POST.Data> {
  const { teachers, name } = JSON.parse(body as string) as API.Class.POST.Body;

  const checks = await Promise.all([
    ClassModel.exists({ "name.long": name.long }),
    ClassModel.exists({ "name.short": name.short }),
    name.special && ClassModel.exists({ "name.special": name.special }),
  ]);

  if (checks[0] != null) throw new Error(`A class with name ${name.long} already exists`);
  if (checks[1] != null) throw new Error(`A class with alias ${name.short} already exists`);
  if (name.special && checks[2] != null) throw new Error(`A class with special name ${name.special} already exists`);

  const teacherIDs = await TeacherModel.findByUsername(teachers, "_id").lean();
  const { _id, createdAt } = await ClassModel.create({
    name,
    teachers: teacherIDs.map((t) => t._id),
  });

  return [{ data: { _id, createdAt }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<object>(req, res, handler, []);
