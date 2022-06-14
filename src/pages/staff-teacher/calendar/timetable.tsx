import useSWR from "swr";
import Head from "next/head";
import { Fragment, useEffect, useRef, useState } from "react";
import { add, differenceInCalendarWeeks, differenceInMinutes, eachHourOfInterval, lightFormat, set } from "date-fns";

import { cx } from "utils";
import { connect } from "db";
import { SettingsModel } from "db/models";
import { Select } from "components/Form/Select";

import type { GetServerSideProps, NextPage } from "next";

const { DaysPanel, HoursPanel, TimetableWeekPanel } = await import("components/Pages/Calendar/Timetable");

const Timetable: NextPage<PageProps> = ({ activeDays, hours }) => {
  const [weeksInTerms, setWeeksInTerms] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Record<"class" | "term" | "week", string>>({ class: "", term: "", week: "" });

  const [classes, setClasses] = useState<Array<Record<"_id" | "name", string>>>();
  const [terms, setTerms] = useState<Array<{ session: string; terms: Array<Record<"_id" | "name", string>> }>>();

  const [timetable, setTimetable] = useState<TimetableData>({ state: 2, data: [] });

  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ time: string; top: number }>();

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

      let week = active.week;
      const weeks: Record<string, number> = {};

      const terms = data.map(({ session, terms }) => ({
        session: session.name.long,
        terms: terms.map((term) => {
          const termWeeks = differenceInCalendarWeeks(new Date(term.end), new Date(term.start));
          weeks[String(term._id)] = termWeeks;

          if (String(term._id) === active.term && +week > termWeeks) week = String(termWeeks);

          if (term._id == current?._id) {
            const currentWeek = differenceInCalendarWeeks(new Date(), new Date(term.start));
            week = String(currentWeek < 1 ? 1 : currentWeek > termWeeks ? termWeeks : currentWeek);
          }

          return {
            _id: String(term._id),
            name: term.name.long,
          };
        }),
      }));

      setTerms(terms);
      setWeeksInTerms(weeks);
      if ((current && !active.term) || week !== active.week)
        setActive((active) => ({ ...active, week, term: current ? String(current._id) : active.term }));
    },
  });

  useSWR<API.Result<API.Timetable.GET.Data>>(
    Object.values(active).every(Boolean) && `/api/calendar/timetable?${new URLSearchParams(active).toString()}`,
    {
      onSuccess(result) {
        if (!result.success && timetable.data.length > 0) return;

        let [state, data] = [1, []] as [typeof timetable.state, typeof timetable.data];

        if (!result.success) state = result.message === "Not Found" ? -2 : -1;
        else [state, data] = [0, result.data.days];

        setTimetable({ state, data });
      },
    }
  );

  useEffect(() => {
    if (+active.week && active.term && active.class) setTimetable({ state: 1, data: [] });
  }, [active]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current?.contains(e.target as Node)) return;

    const { height, top: refTop } = ref.current.getBoundingClientRect();

    let time: Date | undefined;
    let top = e.clientY - refTop;

    if (top < 0) {
      top = 0;
      time = hours.at(0);
    }

    if (top > height) {
      top = height;
      time = hours.at(-1);
    }

    if (top < height && top > 0) {
      let target = e.target as HTMLElement;
      const day = [...([...ref.current.children].find((el) => el.contains(target))?.children ?? [])];

      while (day.indexOf(target) < 0) {
        const parent = target.parentElement;
        if (parent == null) break;

        target = parent;
      }

      const hourIdx = day.indexOf(target);
      const { height, top: targetTop } = target.getBoundingClientRect();

      const offset = (e.clientY - targetTop) / height;

      time = add(new Date(hours[hourIdx]), {
        minutes: offset * differenceInMinutes(new Date(hours[hourIdx + 1]), new Date(hours[hourIdx])),
      });
    }

    setHovered({ time: time ? lightFormat(new Date(time), "hh:mm a") : "", top });
  }

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
              {!active.week && (
                <Select.Item disabled value="">
                  Select a Week
                </Select.Item>
              )}
              {Array.from({ length: weeksInTerms[active.term] ?? 0 }).map((_, idx) => (
                <Select.Item key={idx} value={String(idx + 1)}>
                  Week {idx + 1}
                </Select.Item>
              ))}
            </Select>
          </div>
        </div>
        <div
          className={cx(
            "grid min-h-0 w-full grow select-none grid-cols-[max-content_minmax(0,1fr)] grid-rows-[max-content_minmax(0,1fr)] rounded-lg",
            {
              "divide-x divide-y divide-gray-7 border border-gray-7 dark:divide-gray-dark-7 dark:border-gray-dark-7":
                timetable.state === 0,
            }
          )}
        >
          {timetable.state === -1 && <div className="col-span-full row-span-full">Error loading timetable data</div>}
          {timetable.state === -2 && (
            <div className="col-span-full row-span-full">
              A timetable entry for the selected class, term and week has not been created
            </div>
          )}
          {timetable.state === 0 && (
            <Fragment>
              <div className="col-start-1 col-end-2 row-start-1 row-end-1" />
              <DaysPanel activeDays={activeDays} />
              <HoursPanel hours={hours.slice(0, -1)} lastHour={hours.at(-1)} />
              <div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHovered(undefined)}
                onMouseOver={(e) => !hovered && handleMouseMove(e)}
                className="pointer-events-none relative z-0 col-start-2 col-end-3 row-start-2 row-end-3 grid divide-x divide-gray-7 dark:divide-gray-dark-7"
                style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
              >
                {activeDays.map((day) => (
                  <TimetableWeekPanel
                    key={day}
                    hours={hours.slice(0, -1)}
                    periods={timetable.data.find((e) => e.day === day)?.periods}
                  />
                ))}
                {hovered && (
                  <div
                    style={{ top: hovered.top }}
                    className="pointer-events-none absolute inset-x-0 z-10 flex w-full -translate-y-1/2 items-center justify-start gap-1.5 !border-0 pr-1.5"
                  >
                    <div className="h-px grow bg-gray-8 dark:bg-gray-dark-8" />
                    <div className="p-1 text-xs font-medium tracking-wide text-gray-11 dark:text-gray-dark-11">
                      {hovered.time}
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          )}
          {timetable.state === 1 && <div className="col-span-full row-span-full">Loading data</div>}
          {timetable.state === 2 && (
            <div className="col-span-full row-span-full">Choose a Class, Term and Week from the fields above</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  await connect();
  const settings = await SettingsModel.findOne({}, "activeSchoolDays activeSchoolTime").lean();

  function getLimit(items: Array<{ value: Date }>, isAfter: (left: Date, right: Date) => boolean, offset: number) {
    const setter = (date: Date) => set(new Date(0), { hours: date.getHours(), minutes: date.getMinutes() });

    const date = items.reduce((acc, cur) => {
      if (acc.getTime() === 0) return cur.value;

      return isAfter(setter(acc), setter(new Date(cur.value))) ? cur.value : acc;
    }, new Date(0));

    return add(date, { hours: offset });
  }

  const offset = 1;
  const { activeSchoolDays = [], activeSchoolTime = { start: [], end: [] } } = settings ?? {};

  const props = JSON.stringify({
    activeDays: activeSchoolDays,
    hours: eachHourOfInterval({
      start: getLimit(activeSchoolTime.start, (left, right) => left > right, -offset),
      end: getLimit(activeSchoolTime.end, (left, right) => left < right, offset),
    }),
  });

  return { props: JSON.parse(props) as PageProps };
};

type PageProps = {
  hours: Date[];
  activeDays: Schemas.Settings.Schema["activeSchoolDays"];
};

type TimetableData = {
  /**
   * The `state` property is used to indicate the state of the data.
   *
   * - `-2`: The data does not exist.
   * - `-1`: The data failed to fetch.
   * - `0`: The data is ready to be used.
   * - `1`: The data is being updated
   * - `2`: The data has not been fetched.
   */
  state: -2 | -1 | 0 | 1 | 2;
  /** The timetable data. */
  data: API.Timetable.GET.Data["days"];
};

export default Timetable;
