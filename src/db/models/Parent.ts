import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";

const ParentSchema = createUserSchema<Schemas.Parent.Record, Schemas.Parent.Model>({
  occupation: {
    type: String,
    trim: true,
  },
});

export const ParentModel = (mongoose.models[ModelNames.PARENT] ??
  mongoose.model(ModelNames.PARENT, ParentSchema)) as Schemas.Parent.Model;
