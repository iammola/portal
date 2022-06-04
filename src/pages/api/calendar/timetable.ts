import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { compareAsc, differenceInCalendarWeeks, differenceInMinutes, set } from "date-fns";

import { connect } from "db";
import { routeWrapper } from "api/server";
import { ClassModel, SubjectModel, TeacherStaffModel, TermModel, TimetableCalendarModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Timetable.POST.Data> = async (req) => {
  await connect();

  if (req.method === "POST") return POST(req.body as API.Timetable.POST.Body);

  return null;
};

async function POST({ week, ...body }: API.Timetable.POST.Body): API.HandlerResponse<API.Timetable.POST.Data> {
  if (week < 1) throw new Error("Week cannot be less than 1");

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [term, ...checks] = await Promise.all([
    TermModel.findById(body.term, "start end").lean(),
    ClassModel.exists({ _id: body.class }),
    TimetableCalendarModel.exists({ class: body.class, weeks: week }),
  ]);

  if (term == null) throw new Error("Term not found");
  if (checks[0] == null) throw new Error("Class not found");
  if (checks[1] != null) throw new Error("Timetable already specified for specified Class and Week");
  if (body.days.length < 1) throw new Error("At least one day must be specified");

  const [termEnd, termStart] = [term.end, term.start].map((d) => new Date(d));

  if (week > differenceInCalendarWeeks(termEnd, termStart))
    throw new Error("Specified term does not have that many weeks");

  const itemIds = body.days.reduce<Record<"subjects" | "teachers", Schemas.ObjectId[]>>(
    (acc, { day, periods }) => {
      const subjects: Schemas.ObjectId[] = [];
      const teachers: Schemas.ObjectId[] = [];

      if (periods.length < 1) throw new Error(`At least one period for day (${daysOfWeek[day]}) is required`);

      periods.forEach((period) => {
        if (period._type === "idle") return;
        subjects.push(period.subject);
        teachers.push(period.teacher);
      });

      return {
        subjects: [...acc.subjects, ...subjects],
        teachers: [...acc.teachers, ...teachers],
      };
    },
    { subjects: [], teachers: [] }
  );

  const [subjects, teachers] = await Promise.all([
    SubjectModel.find({ _id: { $in: [...new Set(itemIds.subjects)] } }, "_id").lean(),
    TeacherStaffModel.find({ _id: { $in: [...new Set(itemIds.teachers)] } }, "_id").lean(),
  ]);

  const days = body.days.map(({ day, ...item }) => {
    if (body.days.find((otherDay) => otherDay.day === day)) throw new Error(`Duplicate ${daysOfWeek[day]} provided`);

    const periods = item.periods.map((period, idx) => {
      const minTime = 45; // TODO: Set in settings
      const [end, start] = [period.end, period.start].map((time) => new Date(time));

      const timeDiff = differenceInMinutes(start, end);
      if (timeDiff < 0) throw new Error("A period start cannot be after end");
      if (timeDiff < minTime) throw new Error(`A period is required to have a minimum of ${minTime} minutes`);
      if (timeDiff % minTime) throw new Error(`The duration of a period must be in multiples of ${minTime}`);

      if (period._type === "subject") {
        const subject = subjects.find((_) => _._id.equals(period.subject));
        const teacher = teachers.find((_) => _._id.equals(period.teacher));

        if (subject == undefined) throw new Error(`The subject on ${daysOfWeek[day]} period ${idx} was not found`);
        if (teacher == undefined) throw new Error(`The teacher on ${daysOfWeek[day]} period ${idx} was not found`);
      } else if (!period.title) throw new Error("Period Title is required");

      return {
        ...period,
        end: set(new Date(0), { hours: end.getHours(), minutes: end.getMinutes() }),
        start: set(new Date(0), { hours: start.getHours(), minutes: start.getMinutes() }),
      };
    });

    return {
      day,
      periods: periods.sort((a, b) => compareAsc(new Date(a.start), new Date(b.start))),
    };
  });

  const { _id } = await TimetableCalendarModel.create({
    weeks: [week],
    term: body.term,
    class: body.class,
    days: days.sort((a, b) => a.day - b.day),
  });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
