import * as LabelPrimitive from "@radix-ui/react-label";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useId, useState, useMemo } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import { checkPasswordStrength, cx } from "utils";

export const Password: React.FC<PasswordProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [check] = useState(checkPasswordStrength);

  const strength = useMemo(() => {
    const value = props.value as string;
    const { score = -1 } = value ? check(value) : {};
    const title = ["Poor", "Weak", "Good", "Strong"][score] ?? "No";

    return { score, title };
  }, [check, props.value]);

  return (
    <PopoverPrimitive.Root>
      <div className="relative flex flex-col items-start justify-center gap-1">
        <LabelPrimitive.Root
          htmlFor={id || customId}
          className="flex w-full select-none items-center justify-between gap-4"
        >
          <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        </LabelPrimitive.Root>
        <PopoverPrimitive.Anchor className="relative">
          <PopoverPrimitive.Trigger asChild>
            <input
              {...props}
              id={id || customId}
              value={props.value ?? ""}
              type={isVisible ? "text" : "password"}
              onChange={(e) => onChange(e.target.value)}
              className="inline-flex h-[45px] w-full min-w-[300px] items-center justify-center rounded bg-gray-3 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:focus:ring-gray-dark-7"
            />
          </PopoverPrimitive.Trigger>
          <div
            onClick={() => setIsVisible(!isVisible)}
            className="absolute top-0 bottom-0 right-2 inline-flex w-6 cursor-pointer items-center justify-center text-gray-11 dark:text-gray-dark-11"
          >
            {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Content
          sideOffset={7}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="flex min-w-[300px] flex-col items-start justify-center gap-3 rounded-md bg-white p-5 shadow-md focus:outline-none dark:bg-gray-dark-3"
        >
          <h4 className="font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{strength.title} Password</h4>
          <div className="flex w-full justify-start gap-1">
            {Array.from({ length: 4 }).map((_, idx) => (
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

interface PasswordProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value?: string;
  children: string;
  onChange(val: string): void;
}
