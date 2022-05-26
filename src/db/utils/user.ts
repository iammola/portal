import { ClientSession, startSession } from "mongoose";

import { connect } from "db";
import { AuthModel, ParentModel, StudentModel, TeacherStaffModel } from "db/models";

/**
 * It creates a user of type T, with the given `body` and calls `sessionCallback` with the session and the user's `_id` if it's defined
 * @param {T} type - The type of user you want to create.
 * @param {B} body - The body of the request.
 * @param [sessionCallback] - This is a function that will be called after the user is created. It will be passed the session and the user's _id and is useful if you want to do something else in the same transaction.
 * @returns a Promise that resolves to an object with the keys _id and schoolMail.
 */
export async function createUser<T extends User, B extends { password: string }>(
  type: T,
  body: B,
  sessionCallback?: (session: ClientSession, _id?: Schemas.ObjectId) => Promise<void>
) {
  await connect();
  const session = await startSession();
  let res: Partial<API.CreateData<Record<"schoolMail", string>>> = {};

  await session.withTransaction(async () => {
    let doc;
    const opts = { session };
    const { password, ...obj } = body;

    if (type === "parent") [doc] = await ParentModel.create([obj], opts);
    if (type === "student") [doc] = await StudentModel.create([obj], opts);
    if (type === "staff-teacher") [doc] = await TeacherStaffModel.create([obj], opts);

    const { _id, schoolMail } = doc ?? {};
    await Promise.all([AuthModel.create([{ password, userId: _id }], opts), sessionCallback?.(session, _id)]);

    res = { _id, schoolMail };
  });

  await session.endSession();
  return res as Required<typeof res>;
}

/**
 * Creates an email address with the user's username
 * @todo Add actual code to create an email address
 * @returns the email address
 */
export function generateSchoolMail(username: string) {
  const DOMAIN = "fake.io";
  return `${username}@${DOMAIN}`;
}

type User = "parent" | "student" | "staff-teacher";
