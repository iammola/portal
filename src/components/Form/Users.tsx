import * as LabelPrimitive from "@radix-ui/react-label";
import { Fragment, useId, useState } from "react";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";

export const Users: React.FC<UsersProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();
  const [preview, setPreview] = useState(false);

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
      <textarea
        {...props}
        id={id || customId}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Use @username to mention a user"
        className="min-h-[100px] min-w-[375px] rounded-md bg-gray-3 p-4 text-xs tracking-wide placeholder:text-gray-11 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:placeholder:text-gray-dark-11 dark:focus:ring-gray-dark-7"
      />
    </div>
  );
};

interface UsersProps extends Omit<React.ComponentProps<"textarea">, "value" | "onChange"> {
  value?: string;
  children: string;
  onChange(val: string): void;
}
