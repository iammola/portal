import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel, TeacherModel } from "db/models";
import { PaginationLimit, routeWrapper } from "utils";

import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetClassesData, CreateClassData, CreateClassRequestBody as CreateBody } from "types/api/classes";

interface GetQuery {
  page?: number;
  projection?: string;
}

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

async function getClasses({ page, projection }: GetQuery): MethodResponse<GetClassesData> {
  await connect();
  const opts = {
    skip: (page ?? 0) * PaginationLimit,
    limit: page === undefined ? undefined : PaginationLimit,
  };

  const [count, classes] = await Promise.all([
    ClassModel.estimatedDocumentCount(),
    ClassModel.find({}, projection?.replaceAll(",", " "), opts)
      .populate<{ subjectsCount: number }>("subjectsCount")
      .sort({ order: "asc" })
      .lean(),
  ]);

  return [
    {
      data: {
        page,
        classes,
        pages: Math.ceil(count / (opts.limit ?? 1)),
      },
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

type D = CreateClassData | GetClassesData;

const handler: ApiHandler<D> = async ({ body, method, query }) => {
  if (method === "POST" && typeof body === "string") return await createClass(JSON.parse(body) as CreateBody);

  if (method === "GET") return await getClasses(query as unknown as GetQuery);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["POST", "GET"]);
