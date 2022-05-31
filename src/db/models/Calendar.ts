import * as mongoose from "mongoose";

import { ModelNames } from "db/constants";
import { EventSchema, TimetableSchema } from "db/schema/Calendar";

const CalendarSchema = new mongoose.Schema({}, { versionKey: false, discriminatorKey: "__type" });

export const CalendarModel =
  mongoose.models[ModelNames.CALENDAR] ?? mongoose.model(ModelNames.CALENDAR, CalendarSchema);

export const EventModel = (CalendarModel.discriminators?.[ModelNames.E_CALENDAR] ??
  CalendarModel.discriminator(ModelNames.E_CALENDAR, EventSchema)) as Schemas.Calendar.EventModel;

export const TimetableModel = (CalendarModel.discriminators?.[ModelNames.T_CALENDAR] ??
  CalendarModel.discriminator(ModelNames.T_CALENDAR, TimetableSchema)) as Schemas.Calendar.TimetableModel;
