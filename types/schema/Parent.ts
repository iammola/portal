import type { Model } from "mongoose";
import type { ModelRecord } from "types/schema";
import type { UserBase, UserVirtuals } from "types/schema/User";

export interface ParentSchema extends UserBase {
  occupation: string;
}

export type ParentRecord<V extends boolean | keyof UserVirtuals = false> =
  ModelRecord<ParentSchema, UserVirtuals, V>;

export type ParentModel = Model<ParentSchema, unknown, unknown, UserVirtuals>;
