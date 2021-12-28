import { Schema } from "mongoose";

import type {
    UserImage as ImageSchemaType,
    UserPassword as PasswordSchemaType,
} from "types/schema/User";

export const userGender = () => ({
    type: String,
    required: [true, "User Gender required"] as [true, string],
});

export const userDOB = (obj: { required: [true, string] } | { default: undefined }) => ({
    type: Date,
    ...obj,
});

export const userName = (
    required: string,
    unique?: true,
    maxLength?: [number, string],
    minLength?: [number, string]
) => ({
    unique,
    maxLength,
    minLength,
    trim: true,
    type: String,
    required: [true, required] as [true, string],
});

export const UserPassword = new Schema<PasswordSchemaType>(
    {
        hash: {
            type: String,
            required: [true, "Password Hash required"],
        },
        salt: {
            type: String,
            required: [true, "Password Salt required"],
        },
    },
    { _id: false }
);

export const UserImage = new Schema<ImageSchemaType>(
    {
        cover: {
            type: String,
            default: undefined,
        },
        portrait: {
            type: String,
            default: undefined,
        },
    },
    { _id: false }
);
