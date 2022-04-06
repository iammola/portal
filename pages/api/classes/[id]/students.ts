import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { ClassModel, StudentModel } from "db/models";
import { NotFoundError, PaginationLimit, routeWrapper } from "utils";

import type { GetClassStudentsData as Data } from "types/api/classes";
import type { ApiHandler, MethodResponse } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

interface GetQuery {
  id: string;
  term: string;
  page?: number;
  projection?: string;
}

async function getStudents({ id, page, projection = "", term }: GetQuery): MethodResponse<Data> {
  await connect();
  const query = { academic: { $elemMatch: { term, class: id } } };
  const opts = {
    skip: +(page ?? 0) * PaginationLimit,
    limit: page === undefined ? undefined : PaginationLimit,
  };

  const exists = await ClassModel.exists({ _id: id });
  if (!exists) throw new NotFoundError("Class not found");

  const [count, students] = await Promise.all([
    StudentModel.countDocuments(query),
    StudentModel.find(query, projection.replace(/,/g, " "), opts).lean(),
  ]);

  return [
    {
      data: {
        students,
        page: opts.skip / PaginationLimit,
        pages: Math.ceil(count / (opts.limit ?? 1)),
      },
      success: true,
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<Data> = async ({ method, query }) => {
  if (method === "GET") return await getStudents(query as unknown as GetQuery);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<Data>(req, res, handler, ["GET"]);
