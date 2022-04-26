import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import { classNames } from "utils";

import type { Value } from ".";

type Popover = React.FC<{
  item: Value;
  edit(): void;
  remove(): void;
  valid?: boolean;
  className: string;
  selectedColor: string;
}>;

type Action = React.FC<{
  type: string;
  action(): void;
  Icon(props: React.ComponentProps<"svg">): JSX.Element;
}>;

const Popover: Popover = ({ className, edit, item, remove, selectedColor, valid }) => {
  return (
    <div className={className}>
      <span
        className={classNames("block w-full !border-none py-0.5 pl-3.5 text-xs", {
          "bg-red-100 text-red-800": valid === false,
          "bg-slate-100 text-slate-800": valid === undefined,
          "bg-emerald-100 text-emerald-800": valid,
        })}
      >
        {valid === false && "Invalid email address"}
        {valid && "Valid email address"}
        {valid === undefined && "Validating email address..."}
      </span>
      <div className="grid h-[4.85rem] w-full grid-cols-4 grid-rows-5 items-center !border-t-0 pl-5 pr-3 pt-3 pb-3">
        <span
          className={classNames(
            "col-start-1 col-end-2 row-span-full flex aspect-square h-12 w-12 items-center justify-center overflow-hidden rounded-full text-2xl uppercase text-white",
            selectedColor
          )}
        >
          {(item.name?.initials ?? item.mail)[0]}
        </span>
        <span
          className={classNames("col-start-2 col-end-5 truncate text-lg font-medium tracking-wide", [
            item.name === undefined,
            "hidden",
            "row-start-1 row-end-4",
          ])}
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
          {item.mail}
        </span>
      </div>
      <div className="flex flex-col gap-y-3 pt-2 pb-3">
        <Action
          action={edit}
          Icon={PencilIcon}
          type="Edit"
        />
        <Action
          action={remove}
          Icon={TrashIcon}
          type="Remove"
        />
      </div>
    </div>
  );
};

const Action: Action = ({ action, Icon, type }) => {
  return (
    <div
      tabIndex={0}
      onClick={action}
      className="hover:bg-slate-200 focus:bg-slate-200 grid h-14 w-full grid-cols-4 items-center py-2 pl-5 pr-3"
    >
      <Icon className="stroke-slate-600 col-start-1 col-end-1 row-span-full flex h-6 w-6 items-center justify-center" />
      <span className="text-slate-600 col-start-2 col-end-5 row-span-full truncate font-medium tracking-wide">
        {type}
      </span>
    </div>
  );
};

export default Popover;
