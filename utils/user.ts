import { Document, startSession } from "mongoose";

import { connect } from "db";
import { AuthModel, ParentModel, StudentModel, TeacherModel } from "db/models";

import type { UserBase } from "types/schema";

export async function createUser<T extends User, B extends { password: string }>(
  type: T,
  body: B
) {
  await connect();
  const session = await startSession();

  const res = await session.withTransaction(async () => {
    let doc;
    const opts = { session };
    const { password, ...obj } = body;

    if (type === "parent") [doc] = await ParentModel.create([obj], opts);
    if (type === "student") [doc] = await StudentModel.create([obj], opts);
    if (type === "teacher") [doc] = await TeacherModel.create([obj], opts);

    const { _id, schoolMail } = doc ?? {};
    await AuthModel.create([{ password, userId: _id }], opts);

    return { _id, schoolMail };
  });

  await session.endSession();
  return res as NonNullableObject<typeof res>;
}

/**
 * Creates an email address with the user's username
 * @todo Add actual code to create an email address
 * @returns the email address
 */
export function generateSchoolMail(this: UserBase & Document) {
  const DOMAIN = "fake.io";
  if (this instanceof Document && this.isNew) return `${this.name.username}@${DOMAIN}`;
}

type NonNullableObject<J> = { [K in keyof J]: NonNullable<J[K]> };

type User = "parent" | "student" | "teacher";
