import * as LabelPrimitive from "@radix-ui/react-label";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { Fragment, useId, useState } from "react";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

import { Avatar, Icons } from "components";
import { cx, useIsomorphicLayoutEffect } from "utils";

export const Users: React.FC<UsersProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();
  const [preview, setPreview] = useState(false);
  const [raw, setRaw] = useState(() => formatValue(props.value ?? ""));

  useIsomorphicLayoutEffect(() => {
    const timeout = setTimeout(() => onChange(formatValue(raw)), 5e2);
    return () => clearTimeout(timeout);
  }, [raw, onChange]);

  function formatValue(val: string) {
    return val
      .toLowerCase()
      .split(/.(?=@\w)|,|\s/g)
      .filter((str) => /^@\w+/.test(str))
      .join(" ")
      .trim();
  }

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <LabelPrimitive.Root htmlFor={id || customId} className="flex w-full select-none items-center gap-1.5">
        <span className="grow text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
        <button
          onClick={() => setPreview(!preview)}
          className="inline-flex items-center gap-2 rounded px-2 py-1.5 text-xs tracking-wide text-gray-12 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5"
        >
          {preview ? (
            <Fragment>
              <Pencil1Icon />
              Edit
            </Fragment>
          ) : (
            <Fragment>
              <EyeOpenIcon />
              Preview
            </Fragment>
          )}
        </button>
      </LabelPrimitive.Root>
      {preview ? (
        <div className="flex min-h-[100px] min-w-[375px] flex-wrap content-start items-start gap-2 rounded-md bg-gray-3 p-4 text-xs tracking-wide dark:bg-gray-dark-3">
          {formatValue(raw)
            .split(" ")
            .map((user, idx) => (
              <User key={idx} username={user} />
            ))}
        </div>
      ) : (
        <textarea
          {...props}
          value={raw}
          id={id || customId}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Use @username to mention a user"
          className="min-h-[100px] min-w-[375px] rounded-md bg-gray-3 p-4 text-xs tracking-wide placeholder:text-gray-11 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:placeholder:text-gray-dark-11 dark:focus:ring-gray-dark-7"
        />
      )}
    </div>
  );
};

const User: React.FC<{ username: string }> = ({ username }) => {
  // `true` - User Exists; `false` - User does not exist; `null` - Checking user
  const [isUser] = useState<boolean | null>(null);
  /* Use `SWR` hook to fetch user data. */
  const [user] = useState({ image: { portrait: "LinkedUserImage" }, name: "Linked User Name", initials: "LUN" });

  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`/link/to/${username}`}
          className={cx([
            isUser !== false,
            "font-medium tracking-wider text-gray-12 underline-offset-1 hover:underline dark:text-gray-dark-12",
            "text-red-11 dark:text-red-dark-11",
          ])}
        >
          {username}
        </Link>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        sideOffset={3}
        className={cx("flex items-center rounded-md bg-white shadow-md dark:bg-gray-dark-2", [
          !isUser,
          "justify-center p-3",
          "justify-start gap-3 p-5",
        ])}
      >
        {isUser && (
          <Fragment>
            <Avatar {...user} src={user.image.portrait} />
            <div className="flex flex-col items-start justify-center gap-1">
              <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{user.name}</span>
              <span className="text-xs text-gray-11 dark:text-gray-dark-11">{username}</span>
            </div>
          </Fragment>
        )}
        {isUser === null && <Icons.LoadingIcon className="h-6 w-6 animate-spin fill-gray-9 dark:fill-gray-dark-9" />}
        {isUser === false && <span className="text-sm text-gray-11 dark:text-gray-dark-11">Username not found</span>}
        <HoverCardPrimitive.Arrow className="fill-white dark:fill-gray-dark-2" />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

type UsersProps = {
  value?: string;
  children: string;
  onChange(val: string): void;
} & Omit<React.ComponentProps<"textarea">, "value" | "onChange">;
