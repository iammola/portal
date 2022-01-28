import {
  addMilliseconds,
  getDaysInMonth,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import { FunctionComponent, useEffect, useRef, useState } from "react";

import NumberInput from "components/Global/Input/Number";
import { classNames } from "utils";

const Field: Field = ({ className, max, min, onChange, value }) => {
  const prevDate = useRef<Date | null>(null);

  const [maxDay, setMaxDay] = useState(31);
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
    if (month !== undefined)
      setMaxDay(
        getDaysInMonth(new Date(year ?? new Date().getFullYear(), month - 1))
      );
  }, [month, year]);

  useEffect(() => {
    if (value !== undefined) {
      const forceValid =
        isBefore(
          value,
          addMilliseconds(max ?? value, +isEqual(value, max ?? value))
        ) &&
        isAfter(
          value,
          addMilliseconds(min ?? value, +isEqual(value, min ?? value) * -1)
        );
      setForceValid(forceValid === true ? undefined : false);
    }
  }, [max, min, value]);

  useEffect(() => {
    if (day !== undefined && month !== undefined && year !== undefined) {
      const newDate = new Date(year, month - 1, day);

      onChange(newDate);
      prevDate.current = newDate;
    }
  }, [day, month, onChange, year]);

  const handleChange = (val: number, func: (val?: number) => void) =>
    func(val === 0 ? undefined : val);

  return (
    <div className={className}>
      <div className="w-[4.5rem]">
        <NumberInput
          id="day"
          required
          min={1}
          max={maxDay}
          label="Day"
          value={day}
          onChange={(val) => handleChange(val, setDay)}
          className={(valid?: boolean) =>
            classNames(
              "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
              {
                "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                  valid === true,
                "invalid:ring-red-400 focus:invalid:ring-red-400":
                  valid === false,
                "!ring-red-400": forceValid === false,
              }
            )
          }
        />
      </div>
      <div className="w-[5rem]">
        <NumberInput
          required
          min={1}
          max={12}
          id="month"
          label="Month"
          value={month}
          onChange={(val) => handleChange(val, setMonth)}
          className={(valid?: boolean) =>
            classNames(
              "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
              {
                "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                  valid === true,
                "invalid:ring-red-400 focus:invalid:ring-red-400":
                  valid === false,
                "!ring-red-400": forceValid === false,
              }
            )
          }
        />
      </div>
      <div className="w-[6.5rem]">
        <NumberInput
          id="year"
          required
          label="Year"
          value={year}
          min={min?.getFullYear() ?? 0}
          max={max?.getFullYear() ?? 9999}
          onChange={(val) => handleChange(val, setYear)}
          className={(valid?: boolean) =>
            classNames(
              "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
              {
                "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                  valid === true,
                "invalid:ring-red-400 focus:invalid:ring-red-400":
                  valid === false,
                "!ring-red-400": forceValid === false,
              }
            )
          }
        />
      </div>
    </div>
  );
};

type Field = FunctionComponent<{
  min?: Date;
  max?: Date;
  value?: Date;
  className: string;
  onChange(val: Date): void;
}>;

export default Field;
