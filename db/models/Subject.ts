import { Schema, model, Model, models } from "mongoose";

import {
    subjectName,
    subjectAlias,
    subjectTeachers,
    SubjectDivisionSchema,
} from "db/schema/Subject";

import type { SubjectSchema as SchemaType } from "types/schema";

export const SubjectSchema = new Schema<SchemaType>({
    teachers: subjectTeachers(),
    name: subjectName("Subject name required"),
    alias: subjectAlias(
        "Subject alias required",
        "Subject alias min-length = 3",
        "Subject alias max-length = 5"
    ),
    class: {
        // TODO: Sort out ref Model
        type: Schema.Types.ObjectId,
        required: [true, "Subject class required"],
    },
    sessions: {
        // TODO: Sort out ref Model
        default: undefined,
        type: [Schema.Types.ObjectId],
    },
    divisions: {
        default: undefined,
        type: [SubjectDivisionSchema],
    },
});

export const SubjectModel =
    (models.Subject as Model<SchemaType>) ?? model("Subject", SubjectSchema);
