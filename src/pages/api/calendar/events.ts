import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { USER_ID_COOKIE } from "utils/constants";
import { routeWrapper, UnauthorizedError } from "api/server";
import {
  EventCalendarModel,
  ClassModel,
  ParentModel,
  StaffModel,
  StudentModel,
  TeacherStaffModel,
  TermModel,
} from "db/models";

import type { NextApiRequest, NextApiResponse } from "next";

const handler: API.Handler<API.Event.POST.Data | API.Event.GET.AllData> = async (req) => {
  if (req.method === "POST") {
    const privileged = await StaffModel.hasPrivileges(req.cookies[USER_ID_COOKIE], ["s.cet"]);
    if (!privileged) throw new UnauthorizedError("You are not privileged to create an event");

    return POST(req.body as API.Event.POST.Body);
  }
  if (req.method === "GET") return GET(req.query);

  return null;
};

async function GET({ start, ends, term }: Record<string, unknown>): API.HandlerResponse<API.Event.GET.AllData> {
  const filter = start || ends ? { start: { $gte: start }, ends: { $lte: ends } } : term ? { term } : {};
  const events = await EventCalendarModel.find(filter, "title start ends").lean();

  return [{ data: events, message: ReasonPhrases.OK }, StatusCodes.OK];
}

async function POST({ invitees, ...body }: API.Event.POST.Body): API.HandlerResponse<API.Event.POST.Data> {
  const term = await TermModel.exists({ start: { $gte: body.start }, end: { $lte: body.ends } });
  if (term == null) throw new Error("A term has not been created in the time frame");

  const inviteIDs: Partial<Record<"staff" | "parents" | "students", Schemas.ObjectId[]>> = {};

  if (invitees) {
    if (invitees === "all") invitees = { parents: "all", students: "all", staff: "all" };
    else if (Array.isArray(invitees)) invitees = { parents: invitees, students: invitees, staff: invitees };

    if (invitees.parents) {
      const parents =
        invitees.parents === "all"
          ? await ParentModel.find({}, "_id").lean()
          : await ParentModel.findByUsername(invitees.parents, "_id").lean();

      inviteIDs.parents = parents.map((_) => _._id);
    }

    if (invitees.classes) {
      const term = await TermModel.findCurrent("_id").lean();
      if (term == null) throw new Error("Current term is required to invite by class");

      const query = invitees.classes === "all" ? {} : { _id: { $in: invitees.classes } };

      const classes = await ClassModel.find(query, "teachers").lean();
      const students = await StudentModel.find({
        academic: {
          $elemMatch: {
            term: term._id,
            class: { $in: classes.map((_) => _._id) },
          },
        },
      });

      inviteIDs.students = students.map((_) => _._id);
      inviteIDs.staff = classes.map((_) => _.teachers).flat();
    } else {
      if (invitees.students) {
        const students =
          invitees.students === "all"
            ? await StudentModel.find({}, "_id").lean()
            : await StudentModel.findByUsername(invitees.students, "_id").lean();

        inviteIDs.students = students.map((_) => _._id);
      }

      if (invitees.staff) {
        let teacherIDs: Array<Pick<Schemas.Staff.Record, "_id">> = [];

        if (invitees.staff === "all") teacherIDs = await StaffModel.find({}, "_id").lean();
        else if (Array.isArray(invitees.staff))
          teacherIDs = await StaffModel.findByUsername(invitees.staff, "_id").lean();
        else {
          if (invitees.staff.teachers) {
            const teachers =
              invitees.staff.teachers === "all"
                ? await TeacherStaffModel.find({}, "_id").lean()
                : await TeacherStaffModel.findByUsername(invitees.staff.teachers, "_id").lean();

            teacherIDs.push(...teachers);
          }
        }

        inviteIDs.staff = teacherIDs.map((_) => _._id);
      }
    }
  }

  const { _id } = await EventCalendarModel.create({
    ...body,
    invitees: inviteIDs,
  });

  return [{ data: { _id }, message: ReasonPhrases.CREATED }, StatusCodes.CREATED];
}

export default (req: NextApiRequest, res: NextApiResponse) => routeWrapper(req, res, handler, ["GET", "POST"]);
