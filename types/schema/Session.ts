import { Document, Model, Query } from "mongoose";

import { DocumentId, ModelRecord, TermSchema, ThingName } from "types/schema";

export interface SessionSchema extends DocumentId {
  current?: true;
  name: ThingName;
}

interface SessionVirtuals {
  terms: Omit<TermSchema, "session">[];
}

export type SessionRecord<V extends boolean | keyof SessionVirtuals = false> =
  ModelRecord<SessionSchema, SessionVirtuals, V>;

export interface SessionModel
  extends Model<SessionSchema, unknown, unknown, SessionVirtuals> {
  /**
   * Find the term record where `{ current: true }`
   */
  findCurrent(): Query<
    (Document<unknown, any, SessionSchema> & SessionSchema) | null,
    Document<unknown, any, SessionSchema> & SessionSchema,
    Record<string, never>,
    SessionSchema
  >;
}
