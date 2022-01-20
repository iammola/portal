import { FocusEvent, FunctionComponent, useEffect, useMemo, useState } from "react";

import { classNames } from "utils";

import Drawer from "./BadgeDrawer";

import type { UserBase } from "types/schema/User";

const Badge: Badge = ({ edit, item, remove, setItem }) => {
    const [valid, setValid] = useState<boolean>();
    const [showDrawer, setShowDrawer] = useState(false);
    const selectedColor = useMemo(
        () =>
            ["bg-slate-500", "bg-emerald-500", "bg-red-500", "bg-blue-500", "bg-amber-500"][
                Math.floor(Math.random() * 5)
            ],
        []
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        async function getUserDetails() {
            try {
                // TODO: Fetch user's username and initials. If undefined, setValid to false
                await new Promise(
                    (resolve, reject) =>
                        (timeout = setTimeout(Math.random() > 0.65 ? resolve : reject, 5e3))
                );
                setValid(true);
                setItem({
                    ...item,
                    name: {
                        initials: "UX",
                        username: "u.name",
                    },
                });
            } catch (error: any) {
                setValid(false);
            }
        }

        if (valid === item.name) void getUserDetails();

        return () => {
            clearTimeout(timeout);
        };
    }, [item, setItem, valid]);

    const handleFocus = (e: FocusEvent<HTMLElement>) =>
        setShowDrawer(e.target.contains(document.activeElement));

    return (
        <div
            tabIndex={0}
            contentEditable={false}
            onBlur={handleFocus}
            onFocus={handleFocus}
            suppressContentEditableWarning
            className={classNames(
                "flex flex-row gap-x-2.5 items-center justify-between min-w-max max-w-full border p-[2px] pr-3 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
                {
                    "border-red-300 bg-red-100/20 focus:ring-red-300": valid === false,
                    "border-slate-300 bg-white": valid === undefined,
                    "border-emerald-300 bg-emerald-100/20 focus:ring-emerald-300": valid === true,
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
            {showDrawer === true && (
                <Drawer
                    {...{ selectedColor, item, edit, remove, valid }}
                    className="absolute top-1 left-1 z-50 font-poppins divide-y divide-slate-400 bg-white w-[18.5rem] rounded-md overflow-hidden shadow-md"
                />
            )}
        </div>
    );
};

export type Value = Pick<UserBase, "schoolMail"> & {
    name?: Pick<UserBase["name"], "username" | "initials">;
};

type Badge = FunctionComponent<{
    item: Value;
    edit(): void;
    remove(): void;
    setItem(value: Required<Value>): void;
}>;

export default Badge;
