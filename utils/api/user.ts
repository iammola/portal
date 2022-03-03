import { startSession } from "mongoose";

import { connect } from "db";
import { AuthModel, ParentModel, StudentModel, TeacherModel } from "db/models";

export async function createUser<
  T extends User,
  B extends { password: string }
>(type: T, body: B) {
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

type NonNullableObject<J> = { [K in keyof J]: NonNullable<J[K]> };

type User = "parent" | "student" | "teacher";
