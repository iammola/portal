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
  { versionKey: false }
);

SettingsSchema.pre("save", async function () {
  const count = await this.collection.estimatedDocumentCount();
  if (count > 0) throw new Error("Settings document already exists");
});

export const SettingsModel = (models[ModelNames.SETTINGS] ??
  model(ModelNames.SETTINGS, SettingsSchema)) as Schemas.Settings.Model;

const SETTINGS_DEFAULT = new SettingsModel({
  locked: false,
  activeSchoolDays: [1, 2, 3, 4, 5],
  activeSchoolTime: {
    start: [{ days: [1, 2, 3, 4, 5], value: new Date("1970-01-01T07:00:00.000Z") }],
    end: [
      { days: [1, 2, 3, 4], value: new Date("1970-01-01T13:00:00.000Z") },
      { days: [5], value: new Date("1970-01-01T10:30:00.000Z") },
    ],
  },
  periodDurations: {
    idle: { max: 30, min: 0 },
    subject: { max: 135, min: 45 },
  },
});

SETTINGS_DEFAULT.save({ validateBeforeSave: true }, function (err) {
  if (!err) console.warn("Default Settings Saved to DB");
});
