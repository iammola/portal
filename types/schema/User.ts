export type UserName<T> = {
    [K in "username" | "initials" | "full" | "first" | "last"]: string;
} & (T extends true ? { title: string } : unknown) & {
        other?: string;
    };

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

export interface UserBase<T extends boolean = true> {
    dob?: Date;
    gender: "M" | "F";
    schoolMail: string;
    image: UserImage;
    name: UserName<T>;
    contact: UserContact;
    password: UserPassword;
}
