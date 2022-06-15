import { useState } from "react";
import { endOfMonth, eachDayOfInterval, subDays, eachWeekOfInterval } from "date-fns";

import { useIsomorphicLayoutEffect } from "hooks";

function getDate(date: Date, end: Date): MonthDate {
  const monthEnd = endOfMonth(date);

  return {
    date,
    type: monthEnd > end ? "next" : monthEnd < end ? "previous" : "current",
  };
}

function useInterval(year: number, month: number) {
  const [interval, setInterval] = useState<Record<"start" | "end", Date>>();

  useIsomorphicLayoutEffect(() => {
    const start = new Date(year, month);
    const end = endOfMonth(new Date(year, month));

    const interval = {
      start: start.getDay() > 0 ? subDays(start, start.getDay()) : start,
      end: end.getDay() < 6 ? subDays(end, end.getDay() - 6) : end,
    };

    setInterval(interval);
  }, [month, year]);

  return interval;
}

export function useMonthDates(year: number, month: number): MonthRange<"dates"> {
  const interval = useInterval(year, month);
  const [dates, setDates] = useState<MonthDate[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (!interval) return;
    const end = endOfMonth(new Date(year, month));

    setDates(eachDayOfInterval(interval).map((date) => getDate(date, end)));
  }, [interval, month, year]);

  return { dates, interval };
}

export function useMonthWeeks(year: number, month: number): MonthRange<"weeks"> {
  const interval = useInterval(year, month);
  const [weeks, setWeeks] = useState<MonthDate[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (!interval) return;
    const end = endOfMonth(new Date(year, month));

    setWeeks(eachWeekOfInterval(interval).map((week) => getDate(week, end)));
  }, [interval, month, year]);

  return { weeks, interval };
}

export type MonthDate = {
  date: Date;
  type: "previous" | "current" | "next";
};

type MonthRange<K extends string> = {
  interval?: Record<"start" | "end", Date>;
} & {
  [T in K]: MonthDate[];
};
