import { useState } from "react";
import { endOfMonth, eachDayOfInterval, subDays } from "date-fns";

import { useIsomorphicLayoutEffect } from "hooks";

export function useMonthDates(month: number, year: number) {
  const [dates, setDates] = useState<MonthDate[]>([]);

  useIsomorphicLayoutEffect(() => {
    const start = new Date(year, month - 1);
    const end = endOfMonth(start);

    const interval = eachDayOfInterval({
      start: start.getDay() > 0 ? subDays(start, start.getDay()) : start,
      end: end.getDay() < 6 ? subDays(end, end.getDay() - 6) : end,
    });

    setDates(
      interval.map((date) => {
        const monthEnd = endOfMonth(date);

        return {
          date,
          type:
            monthEnd.getTime() > end.getTime() ? "next" : monthEnd.getTime() < end.getTime() ? "previous" : "current",
        } as const;
      })
    );
  }, [month, year]);

  return dates;
}

type MonthDate = {
  date: Date;
  type: "previous" | "current" | "next";
};
