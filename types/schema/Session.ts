import { Model } from "mongoose";

import { DocumentId, ModelRecord, TermSchema, ThingName } from "types/schema";

export interface SessionSchema extends DocumentId {
  current?: true;
  name: ThingName;
}

export interface SessionVirtuals {
  terms: Omit<TermSchema, "session">[];
}

export type SessionRecord<V extends boolean | keyof SessionVirtuals = false> =
  ModelRecord<SessionSchema, SessionVirtuals, V>;

export type SessionModel = Model<
  SessionSchema,
  unknown,
  unknown,
  SessionVirtuals
>;
