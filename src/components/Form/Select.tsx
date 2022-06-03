import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export const Select: Select = ({ children, id, label, ...props }) => {
  const customId = useId();

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{label}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={id || customId}
          className="inline-flex h-[45px] w-full select-none items-center justify-between gap-8 rounded bg-gray-3 px-4 text-sm text-gray-11 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:bg-gray-dark-3 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5"
        >
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-md dark:bg-gray-dark-3">
          <SelectPrimitive.ScrollUpButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="flex flex-col justify-start gap-1 py-3">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </div>
  );
};

Select.Item = function Item({ children, ...props }) {
  return (
    <SelectPrimitive.Item
      {...props}
      className="relative flex h-9 cursor-pointer select-none items-center py-2 pr-9 pl-6 text-sm tracking-wide text-gray-11 hover:bg-gray-4 focus:bg-gray-5 focus:outline-none dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:bg-gray-dark-5"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-grid w-6 place-items-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export default Select;

type SelectProps = {
  id?: string;
  label: string;
  required?: boolean;
};

type Select = {
  Item: React.FC<Parameters<typeof SelectPrimitive.Item>[0]>;
} & React.FC<CP<Parameters<typeof SelectPrimitive.Root>[0] & SelectProps>>;
