import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel, TeacherModel } from "db/models";
import { NotFoundError, routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function getTeachers(classID: string, proj: unknown): API.HandlerResponse<API.Class.GET.Teachers> {
  await connect();
  const data = await ClassModel.getTeachers(classID, proj as null).lean({ getters: true });

  if (data === null) throw new NotFoundError("Class not found");

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function addTeachers(
  _id: string,
  body: API.Class.PUT.Teachers.Body
): API.HandlerResponse<API.Class.PUT.Teachers.Data> {
  await connect();
  const teachers = await TeacherModel.findBySchoolMail(body.teachers, "_id").lean();
  const upd = await ClassModel.updateOne({ _id }, { $addToSet: { teachers: { $each: teachers.map((t) => t._id) } } });

  return [
    {
      message: ReasonPhrases.OK,
      data: { success: upd.acknowledged && upd.modifiedCount === 1 },
    },
    StatusCodes.OK,
  ];
}

const handler: API.Handler<D> = async ({ body, query, method }) => {
  if (method === "GET") return await getTeachers(query.id as string, (query.projection as string).replaceAll(",", " "));

  if (method === "PUT" && typeof body === "string")
    return await addTeachers(query.id as string, JSON.parse(body) as API.Class.PUT.Teachers.Body);

  return null;
};

type D = API.Class.PUT.Teachers.Data | API.Class.GET.Teachers;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["GET", "PUT"]);
