import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";

const SettingsSchema = new Schema<Schemas.Settings.Record, Schemas.Settings.Model>(
  {
    locked: {
      type: Boolean,
    },
  },
  { capped: { max: 1, size: 1024 }, versionKey: false }
);

export const SettingsModel = (models[ModelNames.SETTINGS] ??
  model(ModelNames.SETTINGS, SettingsSchema)) as Schemas.Settings.Model;
