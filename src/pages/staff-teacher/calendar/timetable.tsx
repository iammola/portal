import useSWR from "swr";
import Head from "next/head";
import { Fragment, useRef, useState } from "react";
import { add, differenceInCalendarWeeks, eachHourOfInterval, set } from "date-fns";

import { connect } from "db";
import { SettingsModel } from "db/models";
import { Select } from "components/Form/Select";

import type { GetServerSideProps, NextPage } from "next";

const { DaysPanel, HoursPanel, TimetableWeekPanel } = await import("components/Pages/Calendar/Timetable");

const Timetable: NextPage<PageProps> = ({ activeDays, hours }) => {
  const [weeksInTerms, setWeeksInTerms] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Record<"class" | "term" | "week", string>>({ class: "", term: "", week: "1" });

  const [classes, setClasses] = useState<Array<Record<"_id" | "name", string>>>();
  const [terms, setTerms] = useState<Array<{ session: string; terms: Array<Record<"_id" | "name", string>> }>>();

  const [timetable, setTimetable] = useState<API.Timetable.GET.Data>();

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

  function handleMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const { height, top: refTop } = ref.current.getBoundingClientRect();

    let top = e.clientY - refTop;

    if (top < 0) top = 0;
    if (top > height) top = height;

    setHovered({ time: "", top });
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
            ref={ref}
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setHovered(undefined)}
            className="relative z-0 col-start-2 col-end-3 row-start-2 row-end-3 grid divide-x divide-gray-7 dark:divide-gray-dark-7"
            style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
          >
            {activeDays.map((day) => (
              <TimetableWeekPanel
                key={day}
                hours={hours}
                periods={timetable?.days.find((e) => e.day === day)?.periods}
              />
            ))}
            {hovered && (
              <div
                style={{ top: hovered.top }}
                className="absolute inset-x-0 z-10 flex w-full -translate-y-1/2 items-center justify-start !border-0"
              >
                <div className="h-0.5 grow bg-red-5 dark:bg-red-dark-5" />
                <div className="rounded p-3">{hovered.time}</div>
              </div>
            )}
          </div>
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

export default Timetable;
