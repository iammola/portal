import * as mongoose from "mongoose";

import { ModelNames } from "db/constants";
import { EventSchema, TimetableSchema } from "db/schema/Calendar";

const CalendarSchema = new mongoose.Schema<Schemas.Calendar.Record>(
  {},
  { versionKey: false, discriminatorKey: "__type" }
);

export const CalendarModel = (mongoose.models[ModelNames.CALENDAR] ??
  mongoose.model(ModelNames.CALENDAR, CalendarSchema)) as Schemas.Calendar.Model;

export const EventCalendarModel = (CalendarModel.discriminators?.[ModelNames.E_CALENDAR] ??
  CalendarModel.discriminator(ModelNames.E_CALENDAR, EventSchema)) as Schemas.Calendar.EventModel;

export const TimetableCalendarModel = (CalendarModel.discriminators?.[ModelNames.T_CALENDAR] ??
  CalendarModel.discriminator(ModelNames.T_CALENDAR, TimetableSchema)) as Schemas.Calendar.TimetableModel;
