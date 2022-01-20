import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { ComponentProps, FunctionComponent } from "react";

import { classNames } from "utils";

import type { Value } from "./Badge";

type Drawer = FunctionComponent<{
    item: Value;
    edit(): void;
    remove(): void;
    valid?: boolean;
    className: string;
    selectedColor: string;
}>;

type Action = FunctionComponent<{
    type: string;
    action(): void;
    Icon(props: ComponentProps<"svg">): JSX.Element;
}>;

const Drawer: Drawer = ({ className, edit, item, remove, selectedColor, valid }) => {
    return (
        <div className={className}>
            <span
                className={classNames("block w-full text-xs py-0.5 pl-3.5 !border-none", {
                    "bg-red-100 text-red-800": valid === false,
                    "bg-slate-100 text-slate-800": valid === undefined,
                    "bg-emerald-100 text-emerald-800": valid === true,
                })}
            >
                {valid === false && "Invalid email address"}
                {valid === true && "Valid email address"}
                {valid === undefined && "Validating email address..."}
            </span>
            <div className="grid grid-cols-4 grid-rows-5 items-center w-full pl-5 pr-3 pt-3 pb-3 h-[4.85rem] !border-t-0">
                <span
                    className={classNames(
                        "flex items-center justify-center rounded-full overflow-hidden text-2xl text-white uppercase aspect-square w-12 h-12 col-start-1 col-end-2 row-span-full",
                        selectedColor
                    )}
                >
                    {(item.name?.initials ?? item.schoolMail)[0]}
                </span>
                <span
                    className={classNames(
                        "col-start-2 col-end-5 truncate font-medium text-lg tracking-wide",
                        [item.name === undefined, "hidden", "row-start-1 row-end-4"]
                    )}
                >
                    {item.name?.username}
                </span>
                <span
                    className={classNames("col-start-2 col-end-5 truncate", [
                        item.name === undefined,
                        "row-span-full",
                        "row-start-4 row-end-5 text-sm",
                    ])}
                >
                    {item.schoolMail}
                </span>
            </div>
            <div className="flex flex-col gap-y-3 pt-2 pb-3">
                <Action action={edit} Icon={PencilIcon} type="Edit" />
                <Action action={remove} Icon={TrashIcon} type="Remove" />
            </div>
        </div>
    );
};

const Action: Action = ({ action, Icon, type }) => {
    return (
        <div
            onClick={action}
            className="grid grid-cols-4 items-center w-full pl-5 pr-3 py-2 h-14 hover:bg-slate-200 focus:bg-slate-200"
        >
            <Icon className="flex items-center justify-center stroke-slate-600 w-6 h-6 col-start-1 col-end-1 row-span-full" />
            <span className="col-start-2 col-end-5 row-span-full font-medium text-slate-600 tracking-wide truncate">
                {type}
            </span>
        </div>
    );
};

export default Drawer;
