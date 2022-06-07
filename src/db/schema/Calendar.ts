import * as mongoose from "mongoose";

import { ModelNames } from "db/constants";

const EventInviteesSchema = new mongoose.Schema<Schemas.Calendar.EventSchema["invitees"]>(
  {
    parents: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "", // TODO: Parent Model
      default: undefined,
    },
    staff: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: ModelNames.STAFF,
      default: undefined,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: ModelNames.STUDENT,
      default: undefined,
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

const TimetableDaySchema = new mongoose.Schema<Schemas.Calendar.TimetableDay>(
  {
    day: {
      type: Number,
      enum: {
        values: [0, 1, 2, 3, 4, 5, 6],
        message: "A day cannot be less than 0 or more than 6",
      },
      required: [true, "Timetable date required"],
    },
    periods: {
      type: [TimetablePeriodSchema],
    },
  },
  { _id: false }
);

export const EventSchema = new mongoose.Schema<Schemas.Calendar.EventSchema>(
  {
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
      default: undefined,
    },
  },
  { versionKey: false }
);

export const TimetableSchema = new mongoose.Schema<Schemas.Calendar.TimetableSchema>(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Timetable Class is required"],
    },
    weeks: {
      type: [Number],
      validate: [
        {
          message: "At least One Week is required",
          validator: (weeks: number[]) => weeks.length > 0,
        },
        {
          message: "Week numbers are meant to be unique",
          validator: (weeks: number[]) => new Set(weeks).size === weeks.length,
        },
        {
          message: "Week number cannot be less than 1",
          validator: (weeks: number[]) => weeks.every((week) => week > 0),
        },
      ],
      required: [true, "Timetable Week is required"],
    },
    days: {
      type: [TimetableDaySchema],
    },
    term: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Timetable Term is required"],
    },
  },
  { versionKey: false }
);
