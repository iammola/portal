import { useId } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export const Input: React.FC<InputProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();

  return (
    <div className="flex flex-col items-start justify-center gap-1">
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
        onChange={(e) => onChange(e.target.value)}
        className="inline-flex h-[45px] w-full min-w-[300px] items-center justify-center rounded bg-gray-2 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-8 dark:bg-gray-dark-2 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:focus:ring-gray-dark-8"
      />
    </div>
  );
};

interface InputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  id?: string;
  children: string;
  onChange(val: string): void;
}
