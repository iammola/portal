import type { Model } from "mongoose";
import type { UserBase } from "types/schema/User";
import type { ModelRecord } from "types/schema";

export interface ParentSchema extends UserBase {
  occupation: string;
}

export type ParentRecord = ModelRecord<ParentSchema>;

export type ParentModel = Model<ParentSchema>;
