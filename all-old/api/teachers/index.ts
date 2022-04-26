import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function createTeacher(body: API.Teacher.POST.Body): API.HandlerResponse<API.Teacher.POST.Data> {
  const { _id, schoolMail } = await createUser("teacher", body);

  return [{ data: { _id, schoolMail }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

const handler: API.Handler<API.Teacher.POST.Data> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createTeacher(JSON.parse(body) as API.Teacher.POST.Body);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Teacher.POST.Data>(req, res, handler, ["POST"]);
