import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { ClassModel, TeacherModel } from "db/models";

import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetClassesData, CreateClassData, CreateClassRequestBody as CreateBody } from "types/api/classes";

async function createClass({ teachers, ...data }: CreateBody): MethodResponse<CreateClassData> {
  await connect();
  const teacherIDs = await TeacherModel.findBySchoolMail(teachers, "_id").lean();
  const { _id, createdAt } = await ClassModel.create({
    ...data,
    teachers: teacherIDs.map((t) => t._id),
  });

  return [
    {
      success: true,
      data: { _id, createdAt },
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

async function getClasses(field: string): MethodResponse<GetClassesData> {
  await connect();
  const data = await ClassModel.find({}, field);

  return [
    {
      data,
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

type D = CreateClassData | GetClassesData;

const handler: ApiHandler<D> = async ({ body, method, query }) => {
  if (method === "POST" && typeof body === "string") return await createClass(JSON.parse(body) as CreateBody);

  if (method === "GET") return await getClasses((query.projection as string).replaceAll(",", " "));

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["POST", "GET"]);
