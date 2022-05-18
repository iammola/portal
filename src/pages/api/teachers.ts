import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { createUser } from "db/utils";
import { StudentModel, TeacherModel, ParentModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Teacher.POST.Data> = async (req) => {
  await connect();
  if (req.method === "POST") return POST(req.body);

  return null;
};

async function POST(body: unknown): API.HandlerResponse<API.Teacher.POST.Data> {
  const data = JSON.parse(body as string) as API.Teacher.POST.Body;

  const check = await Promise.all([
    StudentModel.exists({ username: data.username }),
    TeacherModel.exists({ username: data.username }),
    ParentModel.exists({ username: data.username }),
  ]);

  if (check.every((_) => _ != null)) throw new Error(`A user with the username ${data.username} already exists`);

  const response = await createUser("teacher", data);

  return [{ data: response, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
