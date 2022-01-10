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
        minLength: [3, "Class alias min-length = 3"],
        maxLength: [5, "Class alias max-length = 5"],
    },
    special: {
        trim: true,
        type: String,
        unique: true,
        required: [true, "Class special required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    teachers: {
        // TODO: Sort out ref Model
        type: [Schema.Types.ObjectId],
    },
});

ClassSchema.virtual("subjectsCount", {
    count: true,
    ref: "Subject",
    localField: "_id",
    foreignField: "class",
});

export const ClassModel = (models.Class as Model<SchemaType>) ?? model("Class", ClassSchema);
