import type { DocumentId, ObjectId } from "types/schema";
import type { UserBase, UserImage, UserPassword } from "types/schema/User";

// Note: The `_id` ObjectId property should be provided when creating the document as the guardian's id
export interface StudentGuardianSchema {
    linkedOn: Date;
    guardian: ObjectId;
    relationship: "father" | "mother" | string;
}

export interface StudentSchema extends DocumentId, UserBase {
    image: UserImage;
    password: UserPassword;
    guardians: StudentGuardianSchema[];
    contact: { [K in "email" | "phone" | "address"]: string[] };
    name: { [K in "username" | "initials" | "full" | "first" | "other" | "last"]: string };
}
