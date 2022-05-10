import * as LabelPrimitive from "@radix-ui/react-label";
import { useId, useRef, useState } from "react";

const Component: React.FC<DateProps> = ({ children, id, ...props }) => {
  const customId = useId();

  const dateRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState({
    date: props.value ? String(new Date(props.value).getDate()).padStart(2, "0") : "",
    month: props.value ? String(new Date(props.value).getMonth()).padStart(2, "0") : "",
    year: props.value ? String(new Date(props.value).getFullYear()) : "",
  });

  const updateValue = (val: string, key: keyof typeof value) => setValue((value) => ({ ...value, [key]: val }));

  function setDate(val: string) {
    if (val === "") return updateValue(val, "date");

    let max = 31;
    if (value.month.length === 2) {
      const month = +value.month;
      if ([9, 4, 6, 11].includes(month)) max = 30;
      if (month === 2) max = +value.year % 4 ? 29 : 28;
    }

    let date = String(+val);
    if (+date > max) date = String(max);
    if (+date < 1 && val !== "0") date = "01";

    updateValue(date.padStart(2, "0"), "date");
    if (new RegExp(`^[${max > 29 ? 4 : 3}-9]$`).test(date) || date.length === 2) monthRef.current?.focus();
  }

  function setMonth(val: string) {
    if (val === "") return updateValue(val, "month");

    const max = 12;
    let month = String(+val);
    if (+month > max) month = String(max);
    if (+month < 1 && val !== "0") month = "01";

    updateValue(month.padStart(2, "0"), "month");
    if (+month > 1 || month.length === 2) yearRef.current?.focus();
  }

  function setYear(val: string) {
    if (val === "") return updateValue(val, "year");

    const max = new Date().getFullYear() + 3e2;
    const year = String(+val);

    updateValue(year.padStart(4, "0"), "year");
    if (+year > max) updateValue(String(new Date().getFullYear()), "year");
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
        type="hidden"
        id={id || customId}
        value={props.value ? `${value.year}-${value.month}-${value.date}` : ""}
      />
      <div className="inline-flex h-[45px] items-center justify-center gap-1.5 rounded bg-gray-3 px-2.5 text-sm text-gray-12 dark:bg-gray-dark-3 dark:text-gray-dark-12">
        <input
          type="text"
          pattern="\d*"
          ref={dateRef}
          placeholder="DD"
          value={value.date}
          inputMode="numeric"
          onFocus={(e) => e.target.select()}
          onChange={(e) => setDate(e.target.value)}
          className="h-full w-[40px] bg-transparent text-center focus:outline-none"
        />
        /
        <input
          type="text"
          pattern="\d*"
          ref={monthRef}
          placeholder="MM"
          value={value.month}
          inputMode="numeric"
          onFocus={(e) => e.target.select()}
          onChange={(e) => setMonth(e.target.value)}
          className="h-full w-[40px] bg-transparent text-center focus:outline-none"
        />
        /
        <input
          type="text"
          ref={yearRef}
          pattern="\d*"
          placeholder="YYYY"
          value={value.year}
          inputMode="numeric"
          onFocus={(e) => e.target.select()}
          onChange={(e) => setYear(e.target.value)}
          onBlur={() => value.year === "0000" && setYear("1")}
          className="h-full w-[50px] bg-transparent text-center focus:outline-none"
        />
      </div>
    </div>
  );
};

export { Component as Date };

interface DateProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value?: Date;
  children: string;
  onChange(val?: Date): void;
}
