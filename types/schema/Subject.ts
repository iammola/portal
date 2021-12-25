import { ObjectId, DocumentId } from "types/schema";

export interface SubjectSchema extends DocumentId {
    name: string;
    alias: string;
    class: ObjectId;
    teachers: ObjectId[];
    // Note: If undefined, subject exists for all sessions
    sessions?: ObjectId[];
}
