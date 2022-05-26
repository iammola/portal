import * as LabelPrimitive from "@radix-ui/react-label";
import { useId, useState } from "react";

export const Number: React.FC<NumberProps> = ({ children, id, onValueChange, ...props }) => {
  const customId = useId();
  const [value, setValue] = useState(props.value ?? "");

  function handleChange(val: string) {
    // negative or empty
    if (/^-?$/.test(val)) {
      onValueChange(0);
      setValue(val);
    }
    // decimal
    else if (/\.$/.test(val)) {
      setValue(val.padStart(2, "0"));
      onValueChange(val === "." ? 0 : +val);
    }
    // trailing 0
    else if (+val === +value) {
      setValue(val);
      onValueChange(+val);
    }
    // number
    else if (!isNaN(+val)) {
      onValueChange(+val);
      setValue(+val);
    }
  }

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
        value={value}
        pattern="[\d.]*"
        id={id || customId}
        inputMode={props.inputMode ?? "numeric"}
        onChange={(e) => handleChange(e.target.value)}
        className="inline-flex h-[45px] w-full max-w-[75px] items-center justify-center rounded bg-gray-3 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:focus:ring-gray-dark-7"
      />
    </div>
  );
};

type NumberProps = {
  value?: number;
  children: string;
  onValueChange(val: number): void;
  inputMode?: "numeric" | "decimal";
} & Omit<React.ComponentProps<"input">, "value">;
