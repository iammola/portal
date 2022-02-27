import { Schema, Model, model, models } from "mongoose";

import { ModelNames } from "db";
import { hashPassword } from "utils";

import type { ObjectId, UserPassword } from "types/schema";

const AuthSchema = new Schema<AuthSchema>({
  password: {
    type: String,
    default: undefined,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: [requireHashSalt, "Password Hash required"],
  },
  salt: {
    type: String,
    required: [requireHashSalt, "Password Salt required"],
  },
});

function requireHashSalt(this: AuthSchema) {
  return this.password === undefined;
}

export const AuthModel =
  (models[ModelNames.AUTH] as Model<AuthSchema>) ??
  model<AuthSchema>(ModelNames.AUTH, AuthSchema);

interface AuthSchema extends UserPassword {
  userId: ObjectId;
  password?: string;
}
