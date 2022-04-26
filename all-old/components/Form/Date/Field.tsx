import { addMilliseconds, getDaysInMonth, isAfter, isBefore, isEqual } from "date-fns";
import { useEffect, useRef, useState } from "react";

import NumberInput from "./components/Form/Number";
import { classNames, useIsomorphicLayoutEffect } from "utils";

const Field: Field = ({ className, max, min, onChange, required, value }) => {
  const prevDate = useRef<Date | null>(null);

  const [maxDay, setMaxDay] = useState(31);
  const [typing, setTyping] = useState(false);
  const [forceValid, setForceValid] = useState<boolean>();

  const [day, setDay] = useState<number>();
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();

  useEffect(() => {
    if (prevDate.current?.getTime() !== value?.getTime()) {
      setDay(value?.getDate());
      setYear(value?.getFullYear());
      setMonth(value === undefined ? undefined : value.getMonth() + 1);
    }
  }, [value]);

  useEffect(() => {
    if (month !== undefined) {
      const maxDay = getDaysInMonth(new Date(year ?? new Date().getFullYear(), month - 1));
      isNaN(maxDay) ? setMonth(undefined) : setMaxDay(maxDay);
    }
  }, [month, year]);

  useEffect(() => {
    if (day !== undefined && month !== undefined && year !== undefined) {
      const newDate = new Date(year, month - 1, day);

      onChange(newDate);
      prevDate.current = newDate;
    }
  }, [day, month, onChange, year]);

  useIsomorphicLayoutEffect(() => {
    if (value !== undefined) {
      const forceValid =
        isBefore(value, addMilliseconds(max ?? value, +isEqual(value, max ?? value))) &&
        isAfter(value, addMilliseconds(min ?? value, +isEqual(value, min ?? value) * -1));
      setForceValid(forceValid || typing ? undefined : false);
    }
  }, [max, min, typing, value]);

  const handleChange = (val: number, func: (val?: number) => void) => func(val === 0 ? undefined : val);

  return (
    <div
      className={classNames(className, {
        relative: !required,
      })}
    >
      <div className="w-[4.5rem]">
        <NumberInput
          id="day"
          min={1}
          max={maxDay}
          label="Day"
          value={day}
          hideOptionalLabel
          required={required}
          setTyping={setTyping}
          onChange={(val) => handleChange(val, setDay)}
          className={(valid) =>
            classNames(
              "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:valid:border-transparent focus:invalid:border-transparent",
              {
                "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                "!ring-red-400": forceValid === false,
              }
            )
          }
        />
      </div>
      <div className="w-[5rem]">
        <NumberInput
          min={1}
          max={12}
          id="month"
          label="Month"
          value={month}
          hideOptionalLabel
          required={required}
          setTyping={setTyping}
          onChange={(val) => handleChange(val, setMonth)}
          className={(valid) =>
            classNames(
              "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:valid:border-transparent focus:invalid:border-transparent",
              {
                "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                "!ring-red-400": forceValid === false,
              }
            )
          }
        />
      </div>
      <div className="w-[6.5rem]">
        <NumberInput
          id="year"
          label="Year"
          value={year}
          hideOptionalLabel
          required={required}
          setTyping={setTyping}
          min={min?.getFullYear() ?? 0}
          max={max?.getFullYear() ?? 9999}
          onChange={(val) => handleChange(val, setYear)}
          className={(valid) =>
            classNames(
              "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:valid:border-transparent focus:invalid:border-transparent",
              {
                "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                "!ring-red-400": forceValid === false,
              }
            )
          }
        />
      </div>
      {!required && <span className="text-slate-500 absolute right-0.5 -top-8 text-xs">Optional</span>}
    </div>
  );
};

type Field = React.FC<{
  min?: Date;
  max?: Date;
  value?: Date;
  className: string;
  required?: boolean;
  onChange(val: Date): void;
}>;

export default Field;