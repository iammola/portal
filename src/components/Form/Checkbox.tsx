import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useId } from "react";
import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons";

export const Checkbox: React.FC<CheckboxProps> = ({ children, id, ...props }) => {
  const customId = useId();

  return (
    <div className="flex items-center gap-2.5">
      <CheckboxPrimitive.Root
        {...props}
        id={id || customId}
        className="grid h-6 w-6 shrink-0 place-items-center rounded bg-gray-3 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-5 active:bg-gray-5 dark:bg-gray-dark-3 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-5 dark:active:bg-gray-dark-5"
      >
        <CheckboxPrimitive.Indicator className="text-gray-12 dark:text-gray-dark-12">
          {props.checked === true && <CheckIcon />}
          {props.checked === "indeterminate" && <DividerHorizontalIcon />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="select-none text-sm tracking-wide text-gray-12 dark:text-gray-dark-12"
      >
        {children}
      </LabelPrimitive.Root>
    </div>
  );
};

export default Checkbox;

type CheckboxProps = Parameters<typeof CheckboxPrimitive.Root>[0] & {
  children: string;
};
