import type { DocumentId } from "types/schema";
import type { UserPassword, UserImage, UserBase } from "types/schema/User";

export interface ParentSchema extends DocumentId, UserBase {
    image: UserImage;
    password: UserPassword;
    occupation: string;
    contact: { [K in "email" | "phone" | "address"]: { [K in "personal" | "work"]: string[] } };
    name: {
        [K in "title" | "username" | "initials" | "full" | "first" | "other" | "last"]: string;
    };
}
