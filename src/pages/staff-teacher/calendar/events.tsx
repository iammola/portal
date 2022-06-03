import * as SeparatorPrimitive from "@radix-ui/react-separator";
import Head from "next/head";
import { Fragment, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { addMonths, format, getWeek, isToday, isWeekend, subMonths } from "date-fns";

import { cx } from "utils";
import { useMonthDates, useMonthWeeks } from "hooks";

import type { NextPage } from "next";

const Events: NextPage = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [days] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);

  const dates = useMonthDates(activeDate);
  const weeks = useMonthWeeks(activeDate);

  return (
    <Fragment>
      <Head>
        <title>Events &middot; Portal</title>
      </Head>
      <div className="flex h-full flex-col items-start justify-center gap-5 p-10 pt-[60px]">
        <h3 className="text-4xl font-bold text-gray-12 dark:text-gray-dark-12">School Events</h3>
        <div className="grid w-full grow grid-cols-[max-content_minmax(0,1fr)] grid-rows-[max-content_minmax(0,1fr)] gap-2.5">
          <div className="col-span-full flex w-full min-w-0 items-center justify-between gap-2.5 rounded-lg bg-gray-3 px-5 py-2 dark:bg-gray-dark-3">
            <h6 className="text-lg font-semibold tracking-wide text-gray-12 dark:text-gray-dark-12">
              {format(activeDate, "MMMM yyyy")}
            </h6>
            <div className="flex items-center justify-center gap-0.5 p-1.5">
              <button
                type="button"
                onClick={() => setActiveDate(subMonths(activeDate, 1))}
                className="rounded-full p-2 text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
              >
                <CaretLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => setActiveDate(new Date())}
                className="rounded-lg px-4 py-1 text-sm text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setActiveDate(addMonths(activeDate, 1))}
                className="rounded-full p-2 text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
              >
                <CaretRightIcon />
              </button>
            </div>
          </div>
          <div className="col-start-1 col-end-2 row-start-2 flex w-[67.5px] min-w-0 flex-col gap-2.5 rounded-lg bg-gray-3 px-2.5 dark:bg-gray-dark-3">
            <div className="h-9 w-full" />
            <SeparatorPrimitive.Root className="h-px w-full bg-gray-11 dark:bg-gray-dark-11" />
            <div className="flex w-full grow flex-col items-start justify-start gap-5">
              {weeks.map(({ date }) => (
                <div key={format(date, "dd-MM-yy")} className="flex w-full grow items-center justify-center p-0.5">
                  <abbr
                    title={`Week ${getWeek(date)} - ${date.getFullYear()}`}
                    className="text-sm font-medium text-gray-11 underline-offset-1 dark:text-gray-dark-11"
                  >
                    {getWeek(date)}
                  </abbr>
                </div>
              ))}
            </div>
          </div>
          <div className="col-start-2 row-start-2 flex h-full w-full min-w-0 flex-col gap-2.5 rounded-lg bg-gray-3 py-2.5 pr-10 pl-10 dark:bg-gray-dark-3">
            <div className="flex w-full items-center gap-5 py-1">
              {days.map((day) => (
                <div
                  key={day}
                  className="flex grow items-center justify-end text-sm font-medium tracking-wide text-gray-11 dark:text-gray-dark-11"
                >
                  {day}
                </div>
              ))}
            </div>
            <SeparatorPrimitive.Root className="h-px w-full bg-gray-11 pl-10 dark:bg-gray-dark-11" />
            <div className="grid w-full grow grid-cols-7 gap-5">
              {dates.map(({ date, type }) => (
                <div
                  key={format(date, "dd-MM-yy")}
                  className={cx("flex flex-col items-end justify-start gap-2.5 rounded-lg p-2.5", {
                    "bg-gray-5 dark:bg-gray-dark-5": isToday(date) && type === "current",
                    "bg-gray-4 dark:bg-gray-dark-4": isToday(date) && type !== "current",
                  })}
                >
                  <span
                    className={cx("text-sm font-medium", [
                      type === "current" && !isWeekend(date),
                      "text-gray-12 dark:text-gray-dark-12",
                      "text-gray-11 dark:text-gray-dark-11",
                    ])}
                  >
                    {format(date, date.getDate() === 1 ? "d MMM" : "d")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
