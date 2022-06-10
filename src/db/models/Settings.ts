import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";
import { ActiveSchoolTime, PeriodDurations } from "src/db/schema/Settings";

const SettingsSchema = new Schema<Schemas.Settings.Record, Schemas.Settings.Model>(
  {
    locked: {
      type: Boolean,
    },
    activeSchoolDays: {
      type: [Number],
      enum: [0, 1, 2, 3, 4, 5, 6],
    },
    activeSchoolTime: {
      type: ActiveSchoolTime,
    },
    periodDurations: {
      type: PeriodDurations,
    },
  },
  { capped: { max: 1, size: 1024 }, versionKey: false }
);

export const SettingsModel = (models[ModelNames.SETTINGS] ??
  model(ModelNames.SETTINGS, SettingsSchema)) as Schemas.Settings.Model;
