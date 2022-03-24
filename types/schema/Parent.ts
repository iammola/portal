import { Model } from "mongoose";

import { ModelRecord } from "types/schema";
import { UserBase, UserStaticMethods, UserVirtuals } from "types/schema/User";

export interface ParentSchema extends UserBase {
  occupation: string;
}

export type ParentRecord<V extends boolean | keyof UserVirtuals = false> = ModelRecord<ParentSchema, UserVirtuals, V>;

export interface ParentModel
  extends Model<ParentSchema, unknown, unknown, UserVirtuals>,
    UserStaticMethods<ParentSchema> {}
