import { formatDistanceToNowStrict } from "date-fns";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { connect } from "db";
import { routeWrapper } from "api";
import { ClassModel, SubjectModel, StudentModel, TermModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Teacher.GET.Students> = async (req) => {
  await connect();
  if (req.method === "GET") return GET(req.query.id, req.query.filter);

  return null;
};

async function GET(id: unknown, filter: unknown): API.HandlerResponse<API.Teacher.GET.Students> {
  const termId = await TermModel.findCurrent("_id").lean();
  if (termId == null) throw new Error("Current Term is not defined");

  const query = {
    academic: {
      $elemMatch: {
        term: termId._id,
        $or: [] as unknown[],
      },
    },
  };

  if (filter !== "all") {
    const [classIDs, subjectIDs] = await Promise.all([
      ClassModel.find({ teachers: id }, "_id").lean(),
      SubjectModel.find({ $or: [{ teachers: id }, { divisions: { teachers: id } }] }, "class").lean(),
    ]);

    query.academic.$elemMatch.$or = [
      { class: { $in: classIDs.map((_) => _._id) } },
      { subjects: { $in: subjectIDs.map((_) => _._id) } },
    ];
  }

  const students = await StudentModel.find(
    query,
    "name.full name.initials username schoolMail dob images.avatar gender academic.class.$"
  ).lean();
  const classes = await ClassModel.find({ _id: { $in: students.map((s) => s.academic[0].class) } }, "name.long").lean();

  const data = students.map(({ academic, dob, name, images, ...rest }) => ({
    ...rest,
    name: name.full,
    avatar: images?.avatar,
    initials: name.initials,
    age: dob ? formatDistanceToNowStrict(new Date(dob)) : undefined,
    class: classes.find((item) => item._id.equals(academic[0].class))?.name.long,
  }));

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

export default async (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET"]);
