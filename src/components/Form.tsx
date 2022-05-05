import { useEffect, useId, useState } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";

export const Input: React.FC<InputProps> = ({ children, id, onChange, validators, ...props }) => {
  const customId = useId();
  const [error, setError] = useState<string | null>(); // `string` - Error; `null` - No Error; `undefined` - Nothing

  useEffect(() => {
    const value = props.value as string;
    if (!value) return;

    const error = validators?.find(({ test: t }) => !(typeof t === "object" ? t.test(value) : t(value)));
    if (error) setError(error.message);
    else {
      setError(null);
      setTimeout(() => setError(undefined), 3e3);
    }
  }, [props.value, validators]);

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
        className="inline-flex h-[45px] w-full min-w-[300px] items-center justify-center rounded bg-gray-2 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:focus:ring-gray-dark-8"
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

export const Select: Select = ({ children, label, ...props }) => {
  return (
    <LabelPrimitive.Root>
      <span className="flex w-full select-none items-center justify-between gap-4">
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{label}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </span>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger className="inline-flex h-[45px] max-w-[200px] select-none items-center justify-center gap-8 rounded bg-gray-3 px-4 text-sm text-gray-11 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:bg-gray-dark-3 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-md dark:bg-gray-dark-3">
          <SelectPrimitive.ScrollUpButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11" />
          <SelectPrimitive.Viewport className="flex flex-col justify-start gap-3 py-3">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11" />
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </LabelPrimitive.Root>
  );
};

Select.Item = function Item({ children, ...props }) {
  return (
    <SelectPrimitive.Item
      {...props}
      className="relative flex h-8 cursor-pointer select-none items-center py-1 pr-9 pl-6 text-sm tracking-wide text-gray-11 hover:bg-gray-4 focus:bg-gray-5 focus:outline-none dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:bg-gray-dark-5"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-grid w-6 place-items-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

interface InputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  id?: string;
  children: string;
  onChange(val: string): void;
  validators?: Array<{
    message: string;
    test: RegExp | ((val: string) => boolean);
  }>;
}

interface SelectProps {
  label: string;
  required?: boolean;
}

interface Select extends React.FC<CP<Parameters<typeof SelectPrimitive.Root>[0] & SelectProps>> {
  Item: React.FC<Parameters<typeof SelectPrimitive.Item>[0]>;
}
