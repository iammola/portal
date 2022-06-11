import { model, models, Schema } from "mongoose";

import { ModelNames } from "db";

const SettingsSchema = new Schema<Schemas.Settings.Record, Schemas.Settings.Model>(
  {
    locked: {
      type: Boolean,
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
});

SETTINGS_DEFAULT.save({ validateBeforeSave: true }, function (err) {
  if (!err) console.warn("Default Settings Saved to DB");
});
