import * as LabelPrimitive from "@radix-ui/react-label";
import { useId } from "react";

import { cx } from "utils";

export const Textarea: React.FC<TextareaProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <textarea
        {...props}
        id={id || customId}
        onChange={(e) => onChange(e.target.value)}
        maxLength={undefined} // So the user can trim the text manually
        className="min-h-[100px] min-w-[375px] rounded-md bg-gray-3 p-4 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:focus:ring-gray-dark-7"
      />
      <div className="mt-1 flex items-center justify-start gap-2 text-xs text-gray-11 empty:hidden dark:text-gray-dark-11">
        {(props.maxLength || props.minLength) && (
          <div>
            <span className="font-medium tracking-wide">
              {(() => {
                const keys = [props.maxLength && "Max:", props.minLength && "Min:"].filter(Boolean);
                if (keys.length > 1) return "Range:";
                return keys;
              })()}
            </span>{" "}
            <span
              className={cx({
                "text-red-11 dark:text-red-dark-11":
                  props.value?.length &&
                  (props.value.length < (props.minLength ?? 0) || props.value.length > (props.maxLength ?? 0)),
              })}
            >
              {props.value?.length ?? 0} / {[props.minLength, props.maxLength].filter(Boolean).join("-")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

type TextareaProps = {
  value?: string;
  children: string;
  maxLength?: number;
  minLength?: number;
  onChange(val: string): void;
} & Omit<React.ComponentProps<"textarea">, "onChange" | "value">;
