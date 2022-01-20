import { FunctionComponent, useMemo, useState } from "react";

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
}>;

export default Badge;
