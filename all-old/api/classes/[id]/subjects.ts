import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "utils/api";
import { TeacherModel, SubjectModel, BaseSubjectModel, GroupSubjectModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

interface GetQuery {
  id: string;
  projection?: string;
}

async function createSubject(data: API.Subject.POST.Body, classID: string): API.HandlerResponse<API.Subject.POST.Data> {
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

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

async function getSubjects({ id, projection = "" }: GetQuery): API.HandlerResponse<API.Class.GET.Subjects> {
  await connect();
  const subjects = await SubjectModel.find({ class: id }, projection.replace(/,/g, " "))
    .sort({ order: "asc" })
    .lean<API.Class.GET.Subjects["subjects"]>({ getters: true });

  return [{ data: { subjects }, message: ReasonPhrases.OK }, StatusCodes.OK];
}

const handler: API.Handler<D> = async ({ body, query, method }) => {
  if (method === "POST" && typeof body === "string")
    return await createSubject(JSON.parse(body) as API.Subject.POST.Body, query.id as string);

  if (method === "GET") return await getSubjects(query as unknown as GetQuery);

  return null;
};

type D = API.Subject.POST.Data | API.Class.GET.Subjects;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper<D>(req, res, handler, ["POST", "GET"]);
