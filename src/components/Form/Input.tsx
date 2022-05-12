import * as LabelPrimitive from "@radix-ui/react-label";
import { useId, useState, useEffect } from "react";
import { Cross2Icon, CheckIcon } from "@radix-ui/react-icons";

export const Input: React.FC<InputProps> = ({ children, id, onChange, validators, ...props }) => {
  const customId = useId();
  const [error, setError] = useState<string | null>(); // `string` - Error; `null` - No Error; `undefined` - Nothing

  useEffect(() => {
    const value = props.value;
    if (!value) return;
    if (!validators?.length) return setError(undefined);

    const error = validators.find(({ test: t }) => !(typeof t === "object" ? t.test(value) : t(value)));
    if (error) setError(error.message);
    else {
      setError(null);
      setTimeout(() => setError((err) => (err === null ? undefined : err)), 3e3);
    }
  }, [props.value, validators]);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <input
        {...props}
        type="text"
        id={id || customId}
        value={props.value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="inline-flex h-[45px] w-full min-w-[150px] items-center justify-center rounded bg-gray-3 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:focus:ring-gray-dark-7"
      />
      {error && (
        <span className="mt-1 inline-flex items-center justify-start gap-1 text-xs text-red-11 dark:text-red-dark-11">
          <Cross2Icon />
          {error}
        </span>
      )}
      {error === null && (
        <span className="mt-1 inline-flex items-center justify-start gap-1 text-xs text-green-11 dark:text-green-dark-11">
          <CheckIcon />
          Looks Good!
        </span>
      )}
    </div>
  );
};

type InputProps = {
  value?: string;
  children: string;
  onChange(val: string): void;
  validators?: Array<{
    message: string;
    test: RegExp | ((val: string) => boolean);
  }>;
} & Omit<React.ComponentProps<"input">, "onChange" | "value">;
