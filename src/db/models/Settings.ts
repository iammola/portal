import * as mongoose from "mongoose";

import { ModelNames } from "db";

const SettingsSchema = new mongoose.Schema<Schemas.Settings.Record, Schemas.Settings.Model>(
  {
    locked: {
      type: Boolean,
    },
  },
  { capped: { max: 1, size: 100000 }, versionKey: false }
);

export const SettingsModel = (mongoose.models[ModelNames.SESSION] ??
  mongoose.model(ModelNames.SESSION, SettingsSchema)) as Schemas.Settings.Model;
