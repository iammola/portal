import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { TeacherModel, SubjectModel, BaseSubjectModel, GroupSubjectModel } from "db/models";

import type { MethodResponse, ApiHandler } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetClassSubjectsData as GetData } from "types/api/classes";
import type { CreateSubjectData as CreateData, CreateSubjectRequestBody as CreateBody } from "types/api/subjects";

interface GetQuery {
  id: string;
  projection?: string;
}

async function createSubject(data: CreateBody, classID: string): MethodResponse<CreateData> {
  await connect();

  const teachers = await TeacherModel.findBySchoolMail(
    data.__type === "base" ? data.teachers : data.divisions.map((d) => d.teachers).flat(),
    "schoolMail"
  ).lean();

  const { _id } =
    data.__type === "base"
      ? await BaseSubjectModel.create({
          ...data,
          class: classID,
          teachers: teachers.map((t) => t._id),
        })
      : await GroupSubjectModel.create({
          ...data,
          class: classID,
          divisions: data.divisions.map((div) => ({
            ...div,
            teachers: div.teachers.map((t) => teachers.find((d) => d.schoolMail === t)?._id).filter(Boolean),
          })),
        });

  return [
    {
      success: true,
      data: { _id },
      message: ReasonPhrases.CREATED,
    },
    StatusCodes.CREATED,
  ];
}

async function getSubjects({ id, projection = "" }: GetQuery): MethodResponse<GetData> {
  await connect();
  const subjects = await SubjectModel.find({ class: id }, projection.replace(/,/g, " ")).lean();

  return [
    {
      success: true,
      data: { subjects },
      message: ReasonPhrases.OK,
    },
    StatusCodes.OK,
  ];
}

const handler: ApiHandler<Data> = async ({ body, query, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createSubject(JSON.parse(body) as CreateBody, query.id as string);

  if (method === "GET") return await getSubjects(query as unknown as GetQuery);

  return null;
};

type Data = CreateData | GetData;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<Data>(req, res, handler, ["POST", "GET"]);
