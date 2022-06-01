import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { differenceInCalendarWeeks, differenceInMinutes, format, isAfter, isSameDay } from "date-fns";

import { connect } from "db";
import { routeWrapper } from "api";
import { ClassModel, SubjectModel, TeacherStaffModel, TermModel, TimetableCalendarModel } from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Timetable.POST.Data> = async (req) => {
  await connect();

  if (req.method === "POST") return POST(req.body as API.Timetable.POST.Body);

  return null;
};

async function POST(body: API.Timetable.POST.Body): API.HandlerResponse<API.Timetable.POST.Data> {
  if (!body.week) throw new Error("Week is required");

  const [term, ...checks] = await Promise.all([
    TermModel.findById(body.term, "start end").lean(),
    ClassModel.exists({ _id: body.class }),
    TimetableCalendarModel.exists({ class: body.class, week: body.week }),
  ]);

  if (term == null) throw new Error("Term not found");
  if (checks[0] == null) throw new Error("Class not found");
  if (checks[1] != null) throw new Error("Timetable already specified for specified Class and Week");
  if (body.days.length < 1) throw new Error("At least one day must be specified");

  const termEnd = new Date(term.end);
  const termStart = new Date(term.start);

  if (body.week > differenceInCalendarWeeks(termEnd, termStart))
    throw new Error("Specified term does not have that many weeks");

  const days: Schemas.Calendar.TimetableSchema["days"] = [];

  const itemIds = body.days.reduce<Record<"subjects" | "teachers", Schemas.ObjectId[]>>(
    (acc, b) => {
      const subjects: Schemas.ObjectId[] = [];
      const teachers: Schemas.ObjectId[] = [];

      if (b.periods.length < 1)
        throw new Error(`At least one period for day (${format(new Date(b.date), "dd/MM/yyyy")}) must be specified`);

      b.periods.forEach((period) => {
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

  body.days.forEach((day) => {
    if (days.find((_) => isSameDay(new Date(_.date), new Date(day.date)))) throw new Error("Duplicate days provided");
    const date = new Date(day.date).getTime();

    if (date > termEnd.getTime()) throw new Error("Cannot add timetable after term end");
    if (date < termStart.getTime()) throw new Error("Cannot add timetable before term begins");

    day.periods.forEach((period, periodIdx) => {
      if (!isSameDay(date, new Date(period.end))) throw new Error("Period end day must match specified date");
      if (!isSameDay(date, new Date(period.start))) throw new Error("Period start day must match specified date");
      if (isAfter(new Date(period.end), new Date(period.start))) throw new Error("Period cannot start after end");

      const minTimeInterval = 45; // TODO: Set in settings
      const timeBetween = differenceInMinutes(new Date(period.start), new Date(period.end));

      if (timeBetween < minTimeInterval)
        throw new Error(
          `Time between Period start and end must be at least ${minTimeInterval} minutes not ${timeBetween}`
        );
      if (timeBetween % minTimeInterval !== 0)
        throw new Error(`Time between Period start and end must be divisible by ${minTimeInterval}`);

      if (period._type === "subject") {
        const subject = subjects.find((_) => _._id.equals(period.subject));
        const teacher = teachers.find((_) => _._id.equals(period.teacher));

        if (subject == undefined)
          throw new Error(
            `Subject does not exist in period ${periodIdx} on day ${format(new Date(day.date), "dd/MM/yyyy")}`
          );
        if (teacher == undefined)
          throw new Error(
            `Teacher does not exist in period ${periodIdx} on day ${format(new Date(day.date), "dd/MM/yyyy")}`
          );
      } else if (!period.title) throw new Error("Period Title is required");
    });

    days.push(day);
  });

  const { _id } = await TimetableCalendarModel.create({
    days,
    week: body.week,
    class: body.class,
  });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST"]);
