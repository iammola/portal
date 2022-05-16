import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { createUser } from "db/utils";
import { ParentModel, StudentModel, TeacherModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Student.POST.Data> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.body);

  return null;
};

async function POST(body: unknown): API.HandlerResponse<API.Student.POST.Data> {
  const { academic, guardians, ...data } = JSON.parse(body as string) as API.Student.POST.Body;

  const check = await Promise.all([
    StudentModel.exists({ "name.username": data.name.username }),
    TeacherModel.exists({ "name.username": data.name.username }),
    ParentModel.exists({ "name.username": data.name.username }),
  ]);

  if (check.every((_) => _ != null)) throw new Error(`A user with the username ${data.name.username} already exists`);

  const response = await createUser("student", data);

  return [{ data: response, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, []);
