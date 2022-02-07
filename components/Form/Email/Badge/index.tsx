import { FocusEvent, FunctionComponent, useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";

import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";
import { useIsomorphicLayoutEffect } from "hooks";

import Popover from "./Popover";

import type { UserBase, UserType } from "types/schema/User";
import type {
  UsersEmailData,
  UsersEmailRequestBody,
} from "types/api/users/email";

const Badge: Badge = ({ edit, item, remove, setItem, userType }) => {
  const [valid, setValid] = useState<boolean>();
  const [showDrawer, setShowDrawer] = useState(false);
  const selectedColor = useMemo(
    () =>
      [
        "bg-slate-500",
        "bg-emerald-500",
        "bg-red-500",
        "bg-blue-500",
        "bg-amber-500",
      ][Math.floor(Math.random() * 5)],
    []
  );

  const { data } = useSWRImmutable("/api/users/email", async (url) =>
    fetchAPIEndpoint<UsersEmailData, UsersEmailRequestBody>(
      url,
      { method: "SEARCH" },
      {
        userType,
        mail: item.mail,
        select: "name.username name.initials",
      }
    )
  );

  useIsomorphicLayoutEffect(() => {
    if (data !== undefined && item.name === undefined) {
      setValid(data.success);

      if (data.success) {
        const { schoolMail, ...other } = data.data;
        setItem({ ...other, mail: schoolMail });
      }
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
        "relative flex min-w-max max-w-full cursor-pointer flex-row items-center justify-between gap-x-2.5 rounded-full border p-[2px] pr-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
        {
          "border-red-300 bg-red-100/20 focus:ring-red-300": valid === false,
          "border-slate-300 bg-white": valid === undefined,
          "border-emerald-300 bg-emerald-100/20 focus:ring-emerald-300":
            valid === true,
        }
      )}
    >
      <span
        className={classNames(
          "flex aspect-square w-[1.85rem] items-center justify-center overflow-hidden rounded-full text-sm uppercase text-white",
          selectedColor
        )}
      >
        {(item.name?.initials ?? item.mail)[0]}
      </span>
      <span className="text-sm tracking-wide text-gray-600">
        {item.name?.username ?? item.mail}
      </span>
      <Popover
        {...{ selectedColor, item, edit, remove, valid }}
        className={classNames(
          "absolute top-1 left-1 z-50 w-[18.5rem] divide-y divide-slate-400 overflow-hidden rounded-md bg-white font-poppins shadow-md",
          {
            "pointer-events-none invisible opacity-0": showDrawer === false,
          }
        )}
      />
    </div>
  );
};

export interface Value {
  _id?: UserBase["_id"];
  mail: string;
  name?: Pick<UserBase["name"], "username" | "initials">;
}

type Badge = FunctionComponent<{
  item: Value;
  edit(): void;
  remove(): void;
  userType: UserType;
  setItem(value: Required<Value>): void;
}>;

export default Badge;
