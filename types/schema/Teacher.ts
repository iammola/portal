import type { DocumentId, ObjectId } from "types/schema";
import type { UserBase, UserImage, UserPassword } from "types/schema/User";

export interface TeacherSchema extends DocumentId, UserBase {
    image: UserImage;
    password: UserPassword;
    privileges: ObjectId;
    contact: { [K in "email" | "phone" | "address"]: string[] };
    name: {
        [K in "title" | "username" | "initials" | "full" | "first" | "other" | "last"]: string;
    };
}
