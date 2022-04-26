import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel, StudentModel } from "db/models";
import { NotFoundError, PaginationLimit, routeWrapper } from "utils";

import type { NextApiRequest, NextApiResponse } from "next";

interface GetQuery {
  id: string;
  term: string;
  page?: number;
  slug: string[];
  projection?: string;
}

async function getStudents({ id, page, projection = "", slug, term }: GetQuery): API.HandlerResponse<Data> {
  await connect();
  const countOnly = slug.join() === "count";
  const query = { academic: { $elemMatch: { term, class: id } } };
  const opts = {
    skip: +(page ?? 0) * PaginationLimit,
    limit: page === undefined ? undefined : PaginationLimit,
  };

  const exists = await ClassModel.exists({ _id: id });
  if (!exists) throw new NotFoundError("Class not found");

  const [count, students] = await Promise.all([
    StudentModel.countDocuments(query),
    countOnly ? [] : StudentModel.find(query, projection.replace(/,/g, " "), opts).lean(),
  ]);

  return [
    {
      data: countOnly
        ? { count }
        : {
            students,
            page: opts.skip / PaginationLimit,
            pages: Math.ceil(count / (opts.limit ?? 1)),
          },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: API.Handler<Data> = async ({ method, query }) => {
  if (method === "GET") return await getStudents(query as unknown as GetQuery);

  return null;
};

type Data = API.Class.GET.Students.Data | API.Class.GET.Students.Count;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<Data>(req, res, handler, ["GET"]);