import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { compareAsc, differenceInCalendarWeeks, differenceInMinutes, set } from "date-fns";

import { connect } from "db";
import { NotFoundError, routeWrapper } from "api/server";
import {
  ClassModel,
  SettingsModel,
  SubjectModel,
  TeacherStaffModel,
  TermModel,
  TimetableCalendarModel,
} from "db/models";

import type { Day } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Timetable.POST.Data | API.Timetable.GET.Data> = async (req) => {
  await connect();

  if (req.method === "GET") return GET(req.query as GETQuery);
  if (req.method === "POST") return POST(req.body as API.Timetable.POST.Body);

  return null;
};

type GETQuery = Record<"week" | "term", string> & { [K in "class" | "teacher"]?: string };
async function GET({ week, teacher, term, ...other }: GETQuery): API.HandlerResponse<API.Timetable.GET.Data> {
  const [query, select, populate] = [
    { term, weeks: +week },
    { weeks: 0 },
    [
      { path: "days.periods.subject", select: "name.long" },
      { path: "days.periods.teacher", select: "username images.avatar name.full name.initials" },
    ],
  ];

  function formatPeriods(
    periods: Schemas.Calendar.TimetablePeriod[],
    withClass?: Pick<Schemas.Class.Schema, "_id" | "name">
  ): API.Timetable.GET.PopulatedPeriod[] {
    return periods.map((period) => {
      if (period._type === "subject") {
        const { subject, teacher } = period as unknown as {
          subject: Schemas.Subject.Record;
          teacher: Schemas.Staff.Record;
        };

        return {
          ...period,
          class: withClass,
          subject: {
            _id: subject._id,
            name: subject.name.long,
          },
          teacher: {
            _id: teacher._id,
            name: teacher.name.full,
            username: teacher.username,
            initials: teacher.name.initials,
            avatar: teacher.images?.avatar,
          },
        };
      }

      return { ...period, class: withClass };
    });
  }

  if (teacher) {
    const timetable = await TimetableCalendarModel.find({ ...query, "days.periods.teacher": teacher }, select, {
      populate: [...populate, { path: "class", select: "name" }],
    }).lean();

    const days = Object.entries(
      timetable.reduce<Record<number, API.Timetable.GET.PopulatedPeriod[]>>(
        (acc, cur) =>
          cur.days.reduce(
            (days, { day, periods }) => ({
              ...days,
              [day]: [
                ...(days[day] ?? []),
                ...formatPeriods(
                  periods.filter(
                    (period) =>
                      period._type === "subject" &&
                      (period.teacher as unknown as Schemas.Staff.Record)._id.equals(teacher)
                  ),
                  cur.class as unknown as Pick<Schemas.Class.Schema, "_id" | "name">
                ),
              ],
            }),
            acc
          ),
        {}
      )
    ).map(([day, periods]) => ({ day: +day as Day, periods }));

    return [{ data: { days, week: +week, term: timetable[0].term }, message: ReasonPhrases.OK }, StatusCodes.OK];
  }

  const timetable = await TimetableCalendarModel.findOne({ ...query, class: other.class }, select, { populate }).lean();

  if (timetable == null) throw new NotFoundError("Timetable entry not found");

  const data = {
    week: +week,
    term: timetable.term,
    class: timetable.class,
    days: timetable.days.map(({ day, periods }) => ({
      day,
      periods: formatPeriods(periods),
    })),
  };

  return [{ data, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function POST({ week, ...body }: API.Timetable.POST.Body): API.HandlerResponse<API.Timetable.POST.Data> {
  if (week < 1) throw new Error("Week cannot be less than 1");

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [term, settings, ...checks] = await Promise.all([
    TermModel.findById(body.term, "start end").lean(),
    SettingsModel.findOne({}, "periodDurations").lean(),
    ClassModel.exists({ _id: body.class }),
    TimetableCalendarModel.exists({ class: body.class, weeks: week }),
  ]);

  if (term == null) throw new Error("Term not found");
  if (settings == null) throw new Error("Period settings not defined");
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

  const days = body.days.map(({ day, ...item }, idx) => {
    if (body.days.find((otherDay, otherIdx) => otherDay.day === day && otherIdx !== idx))
      throw new Error(`Duplicate ${daysOfWeek[day]} periods provided`);

    const periods = item.periods.map((period, idx) => {
      const { max, min } = settings.periodDurations[period._type];
      const [end, start] = [period.end, period.start].map((time) => new Date(time));

      const timeDiff = differenceInMinutes(end, start);
      const key = period._type === "idle" ? "An idle" : "A subject";

      if (timeDiff <= 0) throw new Error(`${key} period cannot be less than 1 minute`);
      if (max > 0 && timeDiff > max) throw new Error(`${key} period is required to have a max of ${max} minutes`);
      if (min > 0 && timeDiff < min) throw new Error(`${key} period is required to have a min of ${min} minutes`);
      if (min > 0 && timeDiff % min) throw new Error(`${key} period's duration must be in multiples of ${min} minutes`);

      if (period._type === "subject") {
        const subject = subjects.find((_) => _._id.equals(period.subject));
        const teacher = teachers.find((_) => _._id.equals(period.teacher));

        if (subject == undefined) throw new Error(`The subject on ${daysOfWeek[day]} period #${idx + 1} was not found`);
        if (teacher == undefined) throw new Error(`The teacher on ${daysOfWeek[day]} period #${idx + 1} was not found`);
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

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["POST", "GET"]);
