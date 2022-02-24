import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ParentModel } from "db/models";
import { routeWrapper } from "utils/api";
import { generateSchoolMail } from "utils/email";

import type {
  CreateParentData as CreateData,
  CreateParentRequestBody as CreateBody,
} from "types/api/parents";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

async function createParent({
  image: _i,
  ...data
}: CreateBody): MethodResponse<CreateData> {
  await connect();

  const { _id, schoolMail } = await ParentModel.create({
    ...data,
    schoolMail: generateSchoolMail(data.name.username),
  });

  return [
    {
      success: true,
      data: { _id, schoolMail },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<CreateData> = async ({ body, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createParent(JSON.parse(body) as CreateBody);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
