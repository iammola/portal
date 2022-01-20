import { FunctionComponent, useEffect, useMemo, useState } from "react";

import { classNames } from "utils";

import type { UserBase } from "types/schema/User";

const Badge: Badge = ({ item, setName }) => {
    const [valid, setValid] = useState<boolean>();
    const selectedColor = useMemo(
        () =>
            ["bg-slate-500", "bg-emerald-500", "bg-red-500", "bg-blue-500", "bg-amber-500"].at(
                Math.floor(Math.random() * 5)
            ),
        []
    );

    useEffect(() => {
        async function getUserDetails() {
            try {
                // TODO: Fetch user's username and initials. If undefined, setValid to false
                await new Promise((resolve, reject) =>
                    setTimeout(Math.random() > 0.65 ? resolve : reject, 5e3)
                );
                setValid(true);
                setName({
                    initials: "UX",
                    username: "u.name",
                });
            } catch (error: any) {
                setValid(false);
            }
        }

        void getUserDetails();
    }, [setName]);

    return (
        <div
            contentEditable={false}
            suppressContentEditableWarning
            className={classNames(
                "flex flex-row gap-x-2.5 items-center justify-between min-w-max max-w-full border p-[2px] pr-3 rounded-full",
                {
                    "border-red-300 bg-red-100/20": valid === false,
                    "border-slate-300 bg-white": valid === undefined,
                    "border-emerald-300 bg-emerald-100/20": valid === true,
                }
            )}
        >
            <span
                className={classNames(
                    "flex items-center justify-center rounded-full overflow-hidden text-sm text-white uppercase aspect-square w-[1.85rem]",
                    selectedColor
                )}
            >
                {(item.name?.initials ?? item.schoolMail)[0]}
            </span>
            <span className="text-sm text-gray-600 tracking-wide">
                {item.name?.username ?? item.schoolMail}
            </span>
        </div>
    );
};

export type Value = Pick<UserBase, "schoolMail"> & {
    name?: Pick<UserBase["name"], "username" | "initials">;
};

type Badge = FunctionComponent<{
    item: Value;
    remove(): void;
    setName(name: NonNullable<Value["name"]>): void;
}>;

export default Badge;
