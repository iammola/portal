import * as mongoose from "mongoose";

import { ModelNames } from "db/constants";

const EventInviteesSchema = new mongoose.Schema<Schemas.Calendar.EventSchema["invitees"]>(
  {
    classes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: ModelNames.CLASS,
    },
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
