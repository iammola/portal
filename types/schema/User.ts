export interface UserPassword {
    hash: string;
    salt: string;
}

export interface UserImage {
    cover?: string;
    portrait?: string;
}

export interface UserBase {
    dob?: Date;
    gender: "M" | "F";
}
