export interface UserPassword {
    hash: string;
    salt: string;
}

export interface UserImage {
    cover?: string;
    portrait?: string;
}

export interface UserSubContact {
    primary: string;
    other?: string;
}

export type UserContact = {
    [K in "email" | "phone" | "address"]: UserSubContact;
};

export interface UserBase {
    dob?: Date;
    gender: "M" | "F";
    image: UserImage;
    contact: UserContact;
    password: UserPassword;
}
