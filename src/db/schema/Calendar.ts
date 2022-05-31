import * as mongoose from "mongoose";

import { ModelNames } from "db/constants";

const EventInviteesSchema = new mongoose.Schema<Schemas.Calendar.EventSchema["invitees"]>(
  {
    parents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "", // TODO: Parent Model
    },
    staff: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: ModelNames.STAFF,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: ModelNames.STUDENT,
    },
  },
  { _id: false }
);

const TimetablePeriodSchema = new mongoose.Schema<Schemas.Calendar.TimetablePeriod>(
  {
    _type: {
      type: String,
      immutable: true,
      enum: ["subject", "idle"],
      required: [true, "Period type required"],
    },
    end: {
      type: Date,
      required: [true, "Period End Date required"],
    },
    start: {
      type: Date,
      required: [true, "Period Start Date required"],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: [
        function (this: Schemas.Calendar.TimetablePeriod) {
          return this._type === "subject";
        },
        "Subject Period requires a Teacher",
      ],
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: [
        function (this: Schemas.Calendar.TimetablePeriod) {
          return this._type === "subject";
        },
        "Subject Period requires a Subject",
      ],
    },
    description: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      required: [
        function (this: Schemas.Calendar.TimetablePeriod) {
          return this._type === "idle";
        },
        "Idle Period requires a Title",
      ],
    },
  },
  { _id: false }
);

const TimetableDaySchema = new mongoose.Schema<Schemas.Calendar.TimetableSchema["days"][number]>(
  {
    date: {
      type: Date,
      required: [true, "Timetable date required"],
    },
    periods: {
      type: [TimetablePeriodSchema],
    },
  },
  { _id: false }
);

export const EventSchema = new mongoose.Schema<Schemas.Calendar.EventSchema>({
  title: {
    type: String,
    required: [true, "Event title required"],
  },
  start: {
    type: Date,
    required: [true, "Event start date required"],
  },
  ends: {
    type: Date,
    required: [true, "Event end date required"],
    validate: {
      message: "End date must be after start date",
      validator: function (this: Schemas.Calendar.EventSchema, end?: Date) {
        return end === undefined ? true : new Date(end).getTime() > new Date(this.start).getTime();
      },
    },
  },
  invitees: {
    type: EventInviteesSchema,
  },
});

export const TimetableSchema = new mongoose.Schema<Schemas.Calendar.TimetableSchema>({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Timetable Class is required"],
  },
  days: {
    type: [TimetableDaySchema],
  },
});
