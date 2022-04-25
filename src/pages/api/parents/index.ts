import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { createUser } from "utils/user";
import { routeWrapper } from "utils/api";

import type { NextApiRequest, NextApiResponse } from "next";

async function createParent(body: API.Parent.POST.Body): API.HandlerResponse<API.Parent.POST.Data> {
  const { _id, schoolMail } = await createUser("parent", body);

  return [{ data: { _id, schoolMail }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

const handler: API.Handler<API.Parent.POST.Data> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createParent(JSON.parse(body) as API.Parent.POST.Body);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<API.Parent.POST.Data>(req, res, handler, ["POST"]);
