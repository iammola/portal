import { Schema, model, models } from "mongoose";

import { userDOB, userGender, UserImage, userName, UserPassword } from "db/schema/User";

import type {
    StudentRecord,
    StudentModel as StudentModelType,
    StudentGuardianSchema as GuardianSchema,
} from "types/schema";

const StudentNameSchema = new Schema<StudentRecord["name"]>(
    {
        last: userName("Last name required"),
        full: userName("Full name required"),
        other: userName("Other name required"),
        first: userName("First name required"),
        initials: userName("Initials required"),
        username: userName("User name required", true),
    },
    { _id: false }
);

const StudentGuardianSchema = new Schema<GuardianSchema>(
    {
        guardian: {
            type: Schema.Types.ObjectId,
            // TODO: Sort out ref Model
            required: [true, "Guardian ID required"],
        },
        linkedOn: {
            type: Date,
            default: new Date(),
        },
        relationship: {
            type: String,
            required: [true, "Guardian Relationship required"],
        },
    },
    { _id: false }
);

export const StudentSchema = new Schema<StudentRecord, StudentModelType>({
    gender: userGender(),
    dob: userDOB({ required: [true, "Student DOB required"] }),
    password: {
        type: UserPassword,
        required: [true, "Student Password required"],
    },
    image: {
        type: UserImage,
        default: undefined,
    },
    name: {
        type: StudentNameSchema,
        required: [true, "Student name required"],
    },
    guardians: {
        default: undefined,
        type: [StudentGuardianSchema],
    },
    contact: {
        required: [true, "Student Contact required"],
    },
});

export const StudentModel =
    (models.Student as StudentModelType) ??
    model<StudentRecord, StudentModelType>("Student", StudentSchema);
