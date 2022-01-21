import { FocusEvent, FunctionComponent, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";

import Popover from "./Popover";

import type { UserBase, UserType } from "types/schema/User";
import type { UsersEmailData, UsersEmailRequestBody } from "types/api/users/email";

const Badge: Badge = ({ edit, item, remove, setItem, userType }) => {
    const [valid, setValid] = useState<boolean>();
    const [showDrawer, setShowDrawer] = useState(false);
    const selectedColor = useMemo(
        () =>
            ["bg-slate-500", "bg-emerald-500", "bg-red-500", "bg-blue-500", "bg-amber-500"][
                Math.floor(Math.random() * 5)
            ],
        []
    );

    const { data } = useSWR("/api/users/email", async (url) =>
        fetchAPIEndpoint<UsersEmailData, UsersEmailRequestBody>(
            url,
            { method: "SEARCH" },
            {
                userType,
                schoolMail: item.schoolMail,
                select: "name.username name.initials",
            }
        )
    );

    useEffect(() => {
        if (data !== undefined) {
            setValid(data.success);

            if (data.success === true)
                setItem({
                    ...item,
                    name: data.data.name,
                });
        }
    }, [data, item, setItem]);

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
                "flex flex-row gap-x-2.5 items-center justify-between min-w-max max-w-full border p-[2px] pr-3 rounded-full relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
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
            <Popover
                {...{ selectedColor, item, edit, remove, valid }}
                className={classNames(
                    "absolute top-1 left-1 z-50 font-poppins divide-y divide-slate-400 bg-white w-[18.5rem] rounded-md overflow-hidden shadow-md",
                    {
                        "opacity-0 invisible pointer-events-none": showDrawer === false,
                    }
                )}
            />
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
    userType: UserType;
    setItem(value: Required<Value>): void;
}>;

export default Badge;
