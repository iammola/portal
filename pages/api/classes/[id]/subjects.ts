import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { TeacherModel, BaseSubjectModel, GroupSubjectModel } from "db/models";

import type { CreateSubjectData as CreateData, CreateSubjectRequestBody as CreateBody } from "types/api/subjects";
import type { MethodResponse, ApiHandler } from "types/api";
import type { NextApiRequest, NextApiResponse } from "next";

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

const handler: ApiHandler<CreateData> = async ({ body, query, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createSubject(JSON.parse(body) as CreateBody, query.id as string);

  return null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) =>
  routeWrapper<CreateData>(req, res, handler, ["POST"]);
