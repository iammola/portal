import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel, TeacherModel } from "db/models";
import { PaginationLimit, routeWrapper } from "utils";

import type { NextApiRequest, NextApiResponse } from "next";

interface GetQuery {
  page?: number;
  projection?: string;
}

async function createClass({ teachers, ...data }: API.Class.POST.Body): API.HandlerResponse<API.Class.POST.Data> {
  await connect();
  const teacherIDs = await TeacherModel.findBySchoolMail(teachers, "_id").lean();
  const { _id, createdAt } = await ClassModel.create({
    ...data,
    teachers: teacherIDs.map((t) => t._id),
  });

  return [{ data: { _id, createdAt }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

async function getClasses({ page, projection = "" }: GetQuery): API.HandlerResponse<API.Class.GET.AllData> {
  await connect();
  const opts = {
    skip: +(page ?? 0) * PaginationLimit,
    limit: page === undefined ? undefined : PaginationLimit,
  };

  const [count, classes] = await Promise.all([
    ClassModel.estimatedDocumentCount(),
    ClassModel.find({}, [...projection.replace(/\+?teachers/g, "").split(","), "-teachers"].join(" "), opts)
      .populate<{ subjectsCount: number }>("subjectsCount")
      .sort({ order: "asc" })
      .lean(),
  ]);

  return [
    {
      data: {
        classes,
        page: opts.skip / PaginationLimit,
        pages: Math.ceil(count / (opts.limit ?? 1)),
      },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

type D = API.Class.POST.Data | API.Class.GET.AllData;

const handler: API.Handler<D> = async ({ body, method, query }) => {
  if (method === "POST" && typeof body === "string") return await createClass(JSON.parse(body) as API.Class.POST.Body);

  if (method === "GET") return await getClasses(query as unknown as GetQuery);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["POST", "GET"]);