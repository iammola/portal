import * as LabelPrimitive from "@radix-ui/react-label";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useId, useState, useMemo } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { passwordStrength, Options } from "check-password-strength";

import { cx } from "utils";

const passwordOptions: Options<string> = [
  { id: 0, value: "Bad", minDiversity: 0, minLength: 0 },
  { id: 1, value: "Poor", minDiversity: 1, minLength: 3 },
  { id: 2, value: "Weak", minDiversity: 2, minLength: 6 },
  { id: 3, value: "Good", minDiversity: 3, minLength: 8 },
  { id: 4, value: "Strong", minDiversity: 3, minLength: 10 },
];

export const Password: React.FC<PasswordProps> = ({ children, id, onValueChange, ...props }) => {
  const customId = useId();
  const [isVisible, setIsVisible] = useState(false);

  const strength = useMemo(() => {
    const strength = props.value ? passwordStrength(props.value, passwordOptions) : { id: -1, value: "No" };
    return { score: strength.id, title: strength.value };
  }, [props.value]);

  return (
    <PopoverPrimitive.Root>
      <div className="relative flex w-full flex-col items-start justify-center gap-1">
        <LabelPrimitive.Root
          htmlFor={id || customId}
          className="flex w-full select-none items-center justify-between gap-4"
        >
          <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        </LabelPrimitive.Root>
        <PopoverPrimitive.Anchor className="relative w-full">
          <PopoverPrimitive.Trigger asChild>
            <input
              {...props}
              id={id || customId}
              value={props.value ?? ""}
              type={isVisible ? "text" : "password"}
              onChange={(e) => onValueChange(e.target.value)}
              className="inline-flex h-[45px] w-full items-center justify-center rounded bg-gray-3 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:focus:ring-gray-dark-7"
            />
          </PopoverPrimitive.Trigger>
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute top-0 bottom-0 right-2 inline-flex w-6 cursor-pointer items-center justify-center text-gray-11 focus:outline-none focus:ring-1 focus:ring-gray-6 dark:text-gray-dark-11 dark:focus:ring-gray-dark-6"
          >
            {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Content
          sideOffset={7}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="flex w-[270px] flex-col items-start justify-center gap-3 rounded-md bg-white p-5 shadow-md focus:outline-none dark:bg-gray-dark-3 xs:w-[300px]"
        >
          <h4 className="font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{strength.title} Password</h4>
          <div className="flex w-full justify-start gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={cx(
                  "h-1.5 shrink-0 grow rounded-full",
                  idx <= strength.score
                    ? {
                        "bg-red-9 dark:bg-red-dark-9": strength.score < 2,
                        "bg-green-9 dark:bg-green-dark-9": strength.score > 2,
                        "bg-amber-9 dark:bg-amber-dark-9": strength.score === 2,
                      }
                    : "bg-gray-5 dark:bg-gray-dark-5"
                )}
              />
            ))}
          </div>
          <PopoverPrimitive.Arrow className="fill-white dark:fill-gray-dark-3" />
        </PopoverPrimitive.Content>
      </div>
    </PopoverPrimitive.Root>
  );
};

type PasswordProps = {
  value?: string;
  children: string;
  onValueChange(val: string): void;
} & Omit<React.ComponentProps<"input">, "value">;
