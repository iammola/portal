import * as LabelPrimitive from "@radix-ui/react-label";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { Fragment, useId, useState } from "react";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useIsomorphicLayoutEffect } from "utils";

export const Users: React.FC<UsersProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();
  const [preview, setPreview] = useState(false);
  const [raw, setRaw] = useState(() => formatValue(props.value ?? ""));

  useIsomorphicLayoutEffect(() => {
    if (!preview) return;
    setRaw((val) => {
      const value = formatValue(val);
      onChange(value);
      return value;
    });
  }, [onChange, preview]);

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
          className="inline-flex items-center gap-2 rounded px-2 py-1.5 text-xs tracking-wide text-gray-12 hover:bg-gray-4 active:bg-gray-5 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4 dark:active:bg-gray-dark-5"
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
          {raw.split(" ").map((user, idx) => (
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
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <Link
          href={`/link/to/${username}`}
          className="font-medium tracking-wider text-gray-12 hover:underline hover:underline-offset-1 dark:text-gray-dark-12"
        >
          {username}
        </Link>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content sideOffset={3} className="rounded-md bg-white p-5 shadow-md dark:bg-gray-dark-2">
        <HoverCardPrimitive.Arrow className="fill-white dark:fill-gray-dark-2" />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

interface UsersProps extends Omit<React.ComponentProps<"textarea">, "value" | "onChange"> {
  value?: string;
  children: string;
  onChange(val: string): void;
}
