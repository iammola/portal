import { Schema, Model, model, models } from "mongoose";

import type { ClassSchema as SchemaType } from "types/schema";

export const ClassSchema = new Schema<SchemaType>({
    name: {
        trim: true,
        type: String,
        unique: true,
        required: [true, "Class name required"],
    },
    alias: {
        trim: true,
        type: String,
        unique: true,
        required: [true, "Class alias required"],
        minlength: [3, "Class alias min-length = 3"],
        maxlength: [5, "Class alias max-length = 5"],
    },
    special: {
        trim: true,
        type: String,
        unique: true,
        required: [true, "Class special required"],
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
    teachers: {
        // TODO: Sort out ref Model
        type: [Schema.Types.ObjectId],
    },
    subjects: {
        // TODO: Sort out ref Model
        type: [Schema.Types.ObjectId],
    },
});

export const ClassModel =
    (models.Class as Model<SchemaType>) ?? model("Class", ClassSchema);
