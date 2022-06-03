import * as LabelPrimitive from "@radix-ui/react-label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useId } from "react";

export const RadioGroup: RadioGroup = ({ children, ...props }) => {
  return (
    <RadioGroupPrimitive.Root {...props} className="flex flex-col items-start gap-2">
      {children}
    </RadioGroupPrimitive.Root>
  );
};

RadioGroup.Item = function Item({ children, id, ...props }) {
  const customId = useId();

  return (
    <div className="flex items-center gap-2.5">
      <RadioGroupPrimitive.Item
        {...props}
        id={id || customId}
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gray-3 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-5 active:bg-gray-5 dark:bg-gray-dark-3 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-5 dark:active:bg-gray-dark-5"
      >
        <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-gray-11 dark:bg-gray-dark-11" />
      </RadioGroupPrimitive.Item>
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="select-none text-sm tracking-wide text-gray-12 dark:text-gray-dark-12"
      >
        {children}
      </LabelPrimitive.Root>
    </div>
  );
};

export default RadioGroup;

type RadioGroup = {
  Item: React.FC<CP<Parameters<typeof RadioGroupPrimitive.Item>[0]>>;
} & React.FC<CP<Parameters<typeof RadioGroupPrimitive.Root>[0]>>;
