import PhoneNumber from "awesome-phonenumber";
import { Schema, SchemaTypeOptions } from "mongoose";

import type {
    UserName as NameSchemaType,
    UserImage as ImageSchemaType,
    UserContact as ContactSchemaType,
    UserPassword as PasswordSchemaType,
    UserSubContact as SubContactSchemaType,
} from "types/schema/User";

export const userGender = () => ({
    type: String,
    required: [true, "User Gender required"] as [true, string],
});

export const userDOB = (obj: { required: [true, string] } | { default: undefined }) => ({
    type: Date,
    ...obj,
});

const userSubName = (
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

const userSubContact = (
    required: string,
    validate?: SchemaTypeOptions<string | undefined>["validate"],
    lowercase?: boolean
) => {
    const [trim, type] = [true, String];

    return new Schema<Required<SubContactSchemaType>>(
        {
            other: { trim, type, lowercase, default: undefined, validate },
            primary: { trim, type, lowercase, required: [true, required], validate },
        },
        { _id: false }
    );
};

export const userName = (withTitle?: true | undefined) =>
    new Schema<NameSchemaType<true>>(
        {
            last: userSubName("Last name required"),
            full: userSubName("Full name required"),
            other: userSubName("Other name required"),
            first: userSubName("First name required"),
            initials: userSubName("Initials required"),
            username: userSubName("User name required", true),
            title: withTitle && userSubName("Title required"),
        },
        { _id: false }
    );

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

export const UserContact = new Schema<ContactSchemaType>(
    {
        email: {
            required: [true, "User email required"],
            type: userSubContact(
                "User email required",
                {
                    validator: (v?: string) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v ?? ""),
                    msg: "Invalid email address",
                },
                true
            ),
        },
        phone: {
            required: [true, "User phone required"],
            type: userSubContact("User phone required", {
                validator: (v?: string) => PhoneNumber(v ?? "").isValid(),
                msg: "Invalid phone number",
            }),
        },
        address: {
            required: [true, "User address required"],
            type: userSubContact("User address required"),
        },
    },
    { _id: false }
);
