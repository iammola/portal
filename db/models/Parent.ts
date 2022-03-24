import { model, models } from "mongoose";

import { ModelNames } from "db";
import { createUserSchema } from "db/schema/User";

import type { ParentRecord, ParentModel as Model } from "types/schema";

const ParentSchema = createUserSchema<ParentRecord, Model>({
  occupation: {
    type: String,
    trim: true,
  },
});

export const ParentModel = (models[ModelNames.PARENT] ?? model(ModelNames.PARENT, ParentSchema)) as Model;
