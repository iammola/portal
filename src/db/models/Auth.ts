import * as mongoose from "mongoose";

import { ModelNames } from "db";
import { hashPassword } from "utils";

const AuthSchema = new mongoose.Schema<AuthSchema>({
  password: {
    type: String,
    default: undefined,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
  if (this._update.hash || this._update.salt) return next(new Error("Cannot change password hash or salt directly"));

  if (!this._update.password) return next(new Error("Password is falsy?"));

  this._update = getHash(this._update.password);
  next();
}

AuthSchema.pre("updateOne", updateHook);
AuthSchema.pre("findOneAndUpdate" as "save", updateHook);
AuthSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    if (!this.password) return next(new Error("Password is falsy?"));

    Object.entries(getHash(this.password)).forEach(
      ([key, val]) => (this[key as keyof ReturnType<typeof getHash>] = val as string)
    );
  }

  next();
});

export const AuthModel = (mongoose.models[ModelNames.AUTH] ??
  mongoose.model<AuthSchema>(ModelNames.AUTH, AuthSchema)) as mongoose.Model<AuthSchema>;

export const UserAuthVirtual: [string, mongoose.VirtualTypeOptions] = [
  "password",
  {
    justOne: true,
    localField: "_id",
    ref: ModelNames.AUTH,
    foreignField: "userId",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
interface AuthSchema extends Schemas.User.Password {
  userId: Schemas.ObjectId;
  password?: string;
}

interface PreUpdateThis {
  _update: Partial<AuthSchema>;
}
