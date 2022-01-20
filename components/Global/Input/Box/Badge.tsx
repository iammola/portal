import { useMemo, FunctionComponent } from "react";

import { classNames } from "utils";

import type { UserBase } from "types/schema/User";

const Badge: Badge = ({ colors, item }) => {
    const selectedColor = useMemo(
        () => colors[Math.floor(Math.random() * colors.length)],
        [colors]
    );

    return (
        <div
            contentEditable={false}
            suppressContentEditableWarning
            className="flex flex-row gap-x-2.5 items-center justify-between min-w-max max-w-full border p-[2px] pr-3 rounded-full bg-white"
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
    colors: string[];
}>;

export default Badge;
