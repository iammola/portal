import { model, models } from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";

const ParentSchema = createUserSchema<Schemas.Parent.Record, Schemas.Parent.Model>({
  occupation: {
    type: String,
    trim: true,
  },
});

export const ParentModel = (models[ModelNames.PARENT] ??
  model(ModelNames.PARENT, ParentSchema)) as Schemas.Parent.Model;
