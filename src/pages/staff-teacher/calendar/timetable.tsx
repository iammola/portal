import useSWR from "swr";
import Head from "next/head";
import { Fragment, useState } from "react";
import { add, differenceInCalendarWeeks, eachHourOfInterval, set } from "date-fns";

import { Select } from "components/Form/Select";

import type { NextPage } from "next";

const activeDays = [1, 2, 3, 4, 5];
// TODO: Active School Days Period Lengths (From Settings)
const periodLengths = {
  45: [1, 2, 3, 4],
  30: [5],
};
// TODO: Time School Starts and End (From Settings)
const time = {
  start: [
    {
      days: [1, 2, 3, 4, 5],
      value: new Date(1970, 0, 1, 8),
    },
  ],
  end: [
    {
      days: [1, 2, 3, 4, 5],
      value: new Date(1970, 0, 1, 14),
    },
    {
      days: [5],
      value: new Date(1970, 0, 1, 11, 30),
    },
  ],
};
// NOTE: Active School Days

function getTimeBounds() {
  /**
   * It takes a date, and returns a new date with the same hours and minutes as the original date, but
   * with the year, month, day, seconds, and milliseconds set to 0
   * @param {Date} date - Date - The date to set the time on
   */
  const setter = (date: Date) => set(new Date(0), { hours: date.getHours(), minutes: date.getMinutes() });

  /**
   * It takes an array of objects, each of which has a value property that is a Date, and returns the
   * Date that is the earliest or latest in the array, depending on the value of the isAfter parameter
   * @param items - Array<{ value: Date }>
   * @param isAfter - a function that takes two dates and returns true if the first date is after the
   * second date
   * @param {number} offset - number - the number of hours to add to the date
   * @returns A date object
   */
  function getLimit(items: Array<{ value: Date }>, isAfter: (left: Date, right: Date) => boolean, offset: number) {
    const date = items.reduce((acc, cur) => {
      if (acc.getTime() === 0) return cur.value;

      return isAfter(setter(acc), setter(new Date(cur.value))) ? cur.value : acc;
    }, new Date(0));

    return add(date, { hours: offset });
  }

  const offset = 1;
  const start = getLimit(time.start, (left, right) => left > right, -offset);
  const end = getLimit(time.end, (left, right) => left < right, offset);

  return { start, end };
}

const { DaysPanel, HoursPanel, TimetableWeekPanel } = await import("components/Pages/Calendar/Timetable");

const Timetable: NextPage = () => {
  const [weeksInTerms, setWeeksInTerms] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Record<"class" | "term" | "week", string>>({ class: "", term: "", week: "1" });

  const [classes, setClasses] = useState<Array<Record<"_id" | "name", string>>>();
  const [terms, setTerms] = useState<Array<{ session: string; terms: Array<Record<"_id" | "name", string>> }>>();

  const [timetable, setTimetable] = useState<API.Timetable.GET.Data>();

  useSWR<API.Result<API.Class.GET.AllData>>("/api/classes", {
    onSuccess(result) {
      if (!result.success) return;
      setClasses(
        result.data.map((item) => ({
          _id: String(item._id),
          name: item.name.long,
        }))
      );
    },
  });

  useSWR<API.Result<API.Term.GET.AllData>>("/api/terms", {
    onSuccess(result) {
      if (!result.success) return;
      const { current, data } = result.data;

      const weeks: Record<string, number> = {};
      let week = timetable?.term.toString() === active.term ? active.week : "1";

      setTerms(
        data.map(({ session, terms }) => ({
          session: session.name.long,
          terms: terms.map((term) => {
            const termWeeks = differenceInCalendarWeeks(new Date(term.end), new Date(term.start));
            weeks[String(term._id)] = termWeeks;

            if (term._id == current?._id) {
              const currentWeek = differenceInCalendarWeeks(new Date(), new Date(term.start));
              week = String(currentWeek < 1 ? 1 : currentWeek > termWeeks ? termWeeks : currentWeek);
            }

            return {
              _id: String(term._id),
              name: term.name.long,
            };
          }),
        }))
      );

      setWeeksInTerms(weeks);
      setActive((active) => ({ ...active, week, term: current && !active.term ? String(current._id) : active.term }));
    },
  });

  useSWR<API.Result<API.Timetable.GET.Data>>(
    Object.values(active).every(Boolean) && `/api/calendar/timetable?${new URLSearchParams(active).toString()}`,
    {
      onSuccess(result) {
        if (!result.success) return;
        setTimetable(result.data);
      },
    }
  );

  const hours = eachHourOfInterval(getTimeBounds());

  return (
    <Fragment>
      <Head>
        <title>Timetable &middot; Portal</title>
      </Head>
      <div className="flex h-full flex-col items-start justify-start gap-5 p-8">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-4xl font-bold text-gray-12 dark:text-gray-dark-12">Timetable</h3>
          <div className="flex items-center justify-center gap-4">
            <Select
              required
              label="Class"
              value={active.class}
              onValueChange={(val) => setActive((active) => ({ ...active, class: val }))}
            >
              {!active.class && (
                <Select.Item disabled value="">
                  Select a Class
                </Select.Item>
              )}
              {classes?.map((item) => (
                <Select.Item key={item._id} value={item._id}>
                  {item.name}
                </Select.Item>
              ))}
            </Select>
            <Select
              required
              label="Term"
              value={active.term}
              onValueChange={(term) => setActive((active) => ({ ...active, term }))}
            >
              {!active.term && (
                <Select.Item disabled value="">
                  Select a Term
                </Select.Item>
              )}
              {terms?.map(({ session, terms }) => (
                <Fragment key={session}>
                  <span className="py-1 pl-2 text-xs font-medium tracking-wide text-gray-11 dark:text-gray-dark-11">
                    {session}
                  </span>
                  {terms.map((term) => (
                    <Select.Item key={term._id} value={term._id}>
                      {term.name}
                    </Select.Item>
                  ))}
                </Fragment>
              ))}
            </Select>
            <Select
              required
              label="Week"
              value={String(active.week)}
              onValueChange={(week) => setActive((active) => ({ ...active, week }))}
            >
              {Array.from({ length: weeksInTerms[active.term] ?? 1 }).map((_, idx) => (
                <Select.Item key={idx} value={String(idx + 1)}>
                  Week {idx + 1}
                </Select.Item>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid min-h-0 w-full grow select-none grid-cols-[max-content_minmax(0,1fr)] grid-rows-[max-content_minmax(0,1fr)] divide-x divide-y divide-gray-7 rounded-lg border border-gray-7 dark:divide-gray-dark-7 dark:border-gray-dark-7">
          <div className="col-start-1 col-end-2 row-start-1 row-end-1" />
          <DaysPanel activeDays={activeDays} />
          <HoursPanel hours={hours} />
          <div
            className="col-start-2 col-end-3 row-start-2 row-end-3 grid divide-y divide-gray-7 dark:divide-gray-dark-7"
            style={{ gridTemplateRows: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
          >
            {activeDays.map((day) => (
              <TimetableWeekPanel
                key={day}
                hours={hours}
                periods={timetable?.days.find((e) => e.day === day)?.periods}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Timetable;
