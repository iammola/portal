import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { useState } from "react";
import { format, add, getWeek, isToday, isWeekend, isSameDay } from "date-fns";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import useSWR from "swr";

import { cx } from "utils";
import { useMonthDates, useMonthWeeks, MonthDate } from "hooks";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const Calendar: React.FC = () => {
  const [events, setEvents] = useState<API.Event.GET.AllData>([]);

  const [activeDate, setActiveDate] = useState(new Date());
  const { dates, interval } = useMonthDates(activeDate);

  useSWR<API.Result<API.Event.GET.AllData>>(
    `/api/calendar/events?start=${+(interval?.start ?? "")}&ends=${+(interval?.end ?? "")}`,
    {
      onSuccess(result) {
        if (!result.success) return;
        setEvents(result.data);
      },
    }
  );

  return (
    <div className="grid min-h-0 w-full grow grid-cols-[max-content_minmax(0,1fr)] grid-rows-[max-content_minmax(0,1fr)] gap-2.5">
      <MonthPanel date={activeDate} onDateChange={setActiveDate} />
      <WeekPanel date={activeDate} />
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
        <div
          className="grid min-h-0 w-full grow grid-cols-7 gap-2.5"
          style={{ gridTemplateRows: `repeat(${dates.length / 7}, minmax(0, 1fr))` }}
        >
          {dates.map((props) => (
            <CalendarDate
              {...props}
              key={format(props.date, "dd-MM-yy")}
              events={events.filter(({ start }) => isSameDay(new Date(start), props.date))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarDate: React.FC<MonthDate & { events: API.Event.GET.AllData }> = ({ date, type }) => {
  return (
    <div
      className={cx(
        "flex flex-col items-end justify-start gap-0.5 overflow-hidden rounded-lg p-2.5",
        !isToday(date)
          ? "hover:bg-gray-6 dark:hover:bg-gray-dark-6"
          : {
              "bg-gray-5 hover:bg-gray-6 dark:bg-gray-dark-5 dark:hover:bg-gray-dark-6": type === "current",
              "bg-gray-4 hover:bg-gray-5 dark:bg-gray-dark-4 dark:hover:bg-gray-dark-5": type !== "current",
            }
      )}
    >
      <time
        dateTime={format(date, "yyyy-MM-dd")}
        className={cx("text-sm font-medium", [
          type === "current" && !isWeekend(date),
          "text-gray-12 dark:text-gray-dark-12",
          "text-gray-11 dark:text-gray-dark-11",
        ])}
      >
        {format(date, date.getDate() === 1 ? "d MMM" : "d")}
      </time>
    </div>
  );
};

const WeekPanel: React.FC<{ date: Date }> = ({ date }) => {
  const { weeks } = useMonthWeeks(date);

  return (
    <div className="col-start-1 col-end-2 row-start-2 flex min-w-0 flex-col gap-2.5 rounded-lg bg-gray-3 px-3.5 dark:bg-gray-dark-3">
      <div className="h-9 w-full" />
      <SeparatorPrimitive.Root className="h-px w-full bg-gray-11 dark:bg-gray-dark-11" />
      <div className="flex w-full grow flex-col items-start justify-start gap-5">
        {weeks.map(({ date }) => (
          <time
            key={format(date, "dd-MM-yy")}
            dateTime={format(date, "yyyy'-W'ww")}
            className="flex w-full grow items-center justify-center p-0.5"
          >
            <abbr
              title={`Week ${getWeek(date)} - ${date.getFullYear()}`}
              className="text-sm font-medium text-gray-11 underline-offset-1 dark:text-gray-dark-11"
            >
              W{getWeek(date)}
            </abbr>
          </time>
        ))}
      </div>
    </div>
  );
};

const MonthPanel: React.FC<{ date: Date; onDateChange(date: Date): void }> = ({ date, onDateChange }) => {
  return (
    <div className="col-span-full flex w-full min-w-0 items-center justify-between gap-2.5 rounded-lg bg-gray-3 px-5 py-2 dark:bg-gray-dark-3">
      <time
        dateTime={format(date, "yyyy-MM")}
        className="text-lg font-semibold tracking-wide text-gray-12 dark:text-gray-dark-12"
      >
        {format(date, "MMMM yyyy")}
      </time>
      <div className="flex items-center justify-center gap-0.5 p-1.5">
        <button
          type="button"
          onClick={() => onDateChange(add(date, { months: -1 }))}
          className="rounded-full p-2 text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
        >
          <CaretLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => onDateChange(new Date())}
          className="rounded-lg px-4 py-1 text-sm text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => onDateChange(add(date, { months: 1 }))}
          className="rounded-full p-2 text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
        >
          <CaretRightIcon />
        </button>
      </div>
    </div>
  );
};

export default Calendar;
