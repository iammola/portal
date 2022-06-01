import * as mongoose from "mongoose";

import { ModelNames } from "db";

const SettingsSchema = new mongoose.Schema<Schemas.Settings.Record, Schemas.Settings.Model>(
  {
    locked: {
      type: Boolean,
    },
  },
  { capped: { max: 1, size: 1024 }, versionKey: false }
);

export const SettingsModel = (mongoose.models[ModelNames.SETTINGS] ??
  mongoose.model(ModelNames.SETTINGS, SettingsSchema)) as Schemas.Settings.Model;
