import { Model } from "mongoose";

import { DocumentId, ModelRecord, SQuery, TermSchema, ThingName } from "types/schema";

export interface SessionSchema extends DocumentId {
  current?: true;
  name: ThingName;
}

interface SessionVirtuals {
  terms: Omit<TermSchema, "session">[];
}

export type SessionRecord<V extends boolean | keyof SessionVirtuals = false> = ModelRecord<
  SessionSchema,
  SessionVirtuals,
  V
>;

export interface SessionModel extends Model<SessionSchema, unknown, unknown, SessionVirtuals> {
  /** Find the term record where `{ current: true }` */
  findCurrent(projection?: any): SQuery<SessionSchema>;
}
