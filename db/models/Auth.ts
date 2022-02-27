import { Schema, Model, model, models, VirtualTypeOptions } from "mongoose";

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
    immutable: true,
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

const getHash = (p: string) => ({
  ...hashPassword(p),
  password: undefined,
});

function requireHashSalt(this: AuthSchema) {
  return this.password === undefined;
}

function updateHook(this: PreUpdateThis, next: (err?: Error) => void) {
  if (this._update.hash || this._update.salt)
    return next(new Error("Cannot change password hash or salt directly"));

  if (!this._update.password) return next(new Error("Password is falsy?"));

  this._update = getHash(this._update.password);
  next();
}

AuthSchema.pre("updateOne", updateHook);
AuthSchema.pre("findOneAndUpdate" as "save", updateHook);
AuthSchema.pre("save", function (this: PreSaveThis, next) {
  if (this.isModified("password")) {
    if (!this.password) return next(new Error("Password is falsy?"));

    Object.entries(getHash(this.password)).forEach(
      ([key, val]) =>
        (this[key as keyof ReturnType<typeof getHash>] = val as string)
    );
  }

  next();
});

export const AuthModel =
  (models[ModelNames.AUTH] as Model<AuthSchema>) ??
  model<AuthSchema>(ModelNames.AUTH, AuthSchema);

export const UserAuthVirtual: [string, VirtualTypeOptions] = [
  "password",
  {
    ref: ModelNames.AUTH,
    localField: "_id",
    foreignField: "userId",
  },
];

interface AuthSchema extends UserPassword {
  userId: ObjectId;
  password?: string;
}

interface PreSaveThis extends AuthSchema {
  isModified(k: keyof AuthSchema): boolean;
}

interface PreUpdateThis {
  _update: Partial<AuthSchema>;
}
