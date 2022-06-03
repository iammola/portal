import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import { cx } from "utils";
import { useIsomorphicLayoutEffect, useMonthDates } from "hooks";

const Component: React.FC<DateProps> = ({ children, id, onValueChange, ...props }) => {
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
    if (isNaN(+val)) return;
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
    if (isNaN(+val)) return;
    if (val === "") return updateValue(val, "month");

    const max = 12;
    let month = String(+val);
    if (+month > max) month = String(max);
    if (+month < 1 && val !== "0") month = "01";

    updateValue(month.padStart(2, "0"), "month");
    if (+month > 1 || month.length === 2) yearRef.current?.focus();
  }

  function setYear(val: string) {
    if (isNaN(+val)) return;
    if (val === "") return updateValue(val, "year");

    const max = new Date().getFullYear() + 3e2;
    let year = String(+val);
    if (+year > max) year = String(new Date().getFullYear());

    updateValue(year.padStart(4, "0"), "year");
  }

  useEffect(() => {
    const { date, month, year } = value;
    if (+date === 0 || +month === 0 || +year === 0) return onValueChange(undefined);

    const result = new Date(+year, +month - 1, +date);
    onValueChange(result);
  }, [onValueChange, value]);

  useEffect(() => {
    if (props.value == undefined) setValue({ date: "", month: "", year: "" });
  }, [props.value]);

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
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Anchor className="inline-flex h-[45px] items-center justify-center gap-0.5 rounded bg-gray-3 px-2.5 text-sm text-gray-12 dark:bg-gray-dark-3 dark:text-gray-dark-12">
          <div className="inline-flex h-full shrink-0 items-center justify-center gap-1.5">
            <input
              type="text"
              pattern="\d*"
              ref={dateRef}
              placeholder="DD"
              value={value.date}
              inputMode="numeric"
              onFocus={(e) => e.target.select()}
              onChange={(e) => setDate(e.target.value)}
              onBlur={() => value.date === "00" && setDate("1")}
              className="h-full w-[40px] shrink-0 bg-transparent text-center focus:outline-none"
              autoComplete={props.autoComplete?.includes("bday") ? "bday-date" : undefined}
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
              onBlur={() => value.month === "00" && setMonth("1")}
              className="h-full w-[40px] shrink-0 bg-transparent text-center focus:outline-none"
              autoComplete={props.autoComplete?.includes("bday") ? "bday-month" : undefined}
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
              className="h-full w-[50px] shrink-0 bg-transparent text-center focus:outline-none"
              autoComplete={props.autoComplete?.includes("bday") ? "bday-year" : undefined}
            />
          </div>
          <PopoverPrimitive.Trigger className="shrink-0 rounded-full p-2.5 hover:bg-gray-5 dark:hover:bg-gray-dark-5">
            <CalendarIcon />
          </PopoverPrimitive.Trigger>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={5}
          className="flex select-none flex-col items-start justify-start gap-3 rounded-md bg-white p-5 shadow-md dark:bg-gray-dark-3"
        >
          <Calendar
            {...value}
            onValueChange={(val, key) => {
              if (key === "date") setDate(val);
              if (key === "month") setMonth(val);
              if (key === "year") setYear(val);
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
};

export { Component as Date };
export default Component;

const Calendar: React.FC<CalendarProps> = ({ date, month, year, onValueChange }) => {
  const [activeMonth, setActiveMonth] = useState(String(month === "" ? new Date().getMonth() + 1 : +month));
  const [textYear, setTextYear] = useState(() => String(year === "" ? new Date().getFullYear() : +year));
  const [{ days, months }] = useState(() => ({
    days: "Su Mo Tu We Th Fr Sa".split(" "),
    months: "January February March April May June July August September October November December".split(" "),
  }));

  const dates = useMonthDates(new Date(+(year || textYear), +activeMonth - 1));

  function setYear(val: string) {
    if (isNaN(+val)) return;
    if (val === "") return String(new Date().getFullYear());

    const max = new Date().getFullYear() + 3e2;
    let year = String(+val);
    if (+year > max) year = String(new Date().getFullYear());

    return year.padStart(4, "0");
  }

  const handleChange = (val: string, key: "date" | "month" | "year") => onValueChange(val, key);

  return (
    <Fragment>
      <div className="flex w-full gap-3 pb-2">
        <div className="h-[30px] grow space-x-2 text-sm text-gray-12 dark:text-gray-dark-12">
          <SelectPrimitive.Root
            value={activeMonth}
            onValueChange={(month) => {
              handleChange(month, "month");
              setActiveMonth(String(+month));
            }}
          >
            <SelectPrimitive.Trigger className="inline-flex h-full select-none items-center justify-center gap-3 rounded px-2 text-sm text-gray-11 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5">
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
                {months.map((month, idx) => (
                  <SelectPrimitive.Item
                    key={month}
                    value={String(idx + 1)}
                    className="relative flex h-9 cursor-pointer select-none items-center py-2 pr-9 pl-6 text-sm tracking-wide text-gray-11 hover:bg-gray-4 focus:bg-gray-5 focus:outline-none dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:bg-gray-dark-5"
                  >
                    <SelectPrimitive.ItemText>{month}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="absolute left-0 inline-grid w-6 place-items-center">
                      <CheckIcon />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
                <ChevronDownIcon />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Root>
          <input
            type="text"
            pattern="\d*"
            value={textYear}
            inputMode="numeric"
            onBlur={(e) => handleChange(e.target.value, "year")}
            onChange={(e) => setTextYear((v) => setYear(e.target.value) ?? v)}
            onKeyDown={(e) => e.code === "Enter" && (e.target as HTMLInputElement).blur()}
            className="inline-flex h-full w-[60px] items-center justify-center border-b border-gray-7 bg-gray-3 px-2.5 text-sm text-gray-11 focus:outline-none dark:border-gray-dark-7 dark:bg-gray-dark-3 dark:text-gray-dark-11"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => +activeMonth > 1 && setActiveMonth(String(+activeMonth - 1))}
            className="rounded-full p-1 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-7"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => +activeMonth < 12 && setActiveMonth(String(+activeMonth + 1))}
            className="rounded-full p-1 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-7 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-7"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div className="grid w-full grid-cols-7 items-center gap-1 text-center text-xs text-gray-11 dark:text-gray-dark-11">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid h-full w-full grow grid-cols-7 items-center gap-2 text-sm">
        {dates.map((item) => (
          <CalendarDate
            key={`${item.date.getDate()} - ${item.type}`}
            isSelected={item.date.getTime() === new Date(+year, +month - 1, +date).getTime()}
            onClick={() => {
              handleChange(String(item.date.getDate()), "date");
              handleChange(String(item.date.getFullYear()), "year");
              handleChange(String(item.date.getMonth() + 1), "month");
            }}
            className={cx(
              "flex h-9 w-9 cursor-pointer items-center justify-center rounded text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-6 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-6",
              [item.type === "current", "text-gray-12 dark:text-gray-dark-12", "text-gray-11 dark:text-gray-dark-11"]
            )}
          >
            {item.date.getDate()}
          </CalendarDate>
        ))}
      </div>
    </Fragment>
  );
};

const CalendarDate: React.FC<CalendarDateProps> = ({ children, isSelected, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (isSelected) ref.current?.focus();
  }, [isSelected]);

  return (
    <button {...props} type="button" ref={ref}>
      {children}
    </button>
  );
};

type DateProps = {
  value?: Date;
  children: string;
  onValueChange(val?: Date): void;
} & Omit<React.ComponentProps<"input">, "value">;

type CalendarProps = {
  onValueChange(val: string, key: "date" | "month" | "year"): void;
} & Record<"date" | "month" | "year", string>;

type CalendarDateProps = {
  className: string;
  onClick(): void;
  children: number;
  isSelected: boolean;
};
