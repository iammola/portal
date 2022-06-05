import { useState } from "react";
import { endOfMonth, eachDayOfInterval, subDays, startOfMonth, eachWeekOfInterval } from "date-fns";

import { useIsomorphicLayoutEffect } from "hooks";

function getDate(date: Date, end: Date): MonthDate {
  const monthEnd = endOfMonth(date);

  return {
    date,
    type: monthEnd > end ? "next" : monthEnd < end ? "previous" : "current",
  };
}

function useInterval(date: Date) {
  const [interval, setInterval] = useState<Record<"start" | "end", Date>>();

  useIsomorphicLayoutEffect(() => {
    const start = startOfMonth(date);
    const end = endOfMonth(start);

    const interval = {
      start: start.getDay() > 0 ? subDays(start, start.getDay()) : start,
      end: end.getDay() < 6 ? subDays(end, end.getDay() - 6) : end,
    };

    setInterval(interval);
  }, [date]);

  return interval;
}

export function useMonthDates(date: Date): MonthRange<"dates"> {
  const interval = useInterval(date);
  const [dates, setDates] = useState<MonthDate[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (!interval) return;

    const end = endOfMonth(date);
    setDates(eachDayOfInterval(interval).map((date) => getDate(date, end)));
  }, [date, interval]);

  return { dates, interval };
}

export function useMonthWeeks(date: Date): MonthRange<"weeks"> {
  const interval = useInterval(date);
  const [weeks, setWeeks] = useState<MonthDate[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (!interval) return;

    const end = endOfMonth(date);
    setWeeks(eachWeekOfInterval(interval).map((week) => getDate(week, end)));
  }, [date, interval]);

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
