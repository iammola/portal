import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { differenceInMinutes, lightFormat } from "date-fns";

import { Avatar } from "components/Avatar";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const DaysPanel: React.FC<{ activeDays: number[] }> = ({ activeDays }) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
      className="col-start-2 col-end-3 row-start-1 row-end-2 grid divide-x divide-gray-7 !border-t-0 dark:divide-gray-dark-7"
    >
      {activeDays.map((day) => (
        <div
          key={day}
          className="flex h-full min-h-0 w-full items-center justify-center p-2 text-gray-11 dark:text-gray-dark-11"
        >
          {days[day]}
        </div>
      ))}
    </div>
  );
};

export const HoursPanel: React.FC<{ hours: Date[]; lastHour?: Date }> = ({ hours, lastHour }) => {
  return (
    <div
      style={{ gridTemplateRows: `repeat(${hours.length}, minmax(0, 1fr))` }}
      className="col-start-1 col-end-2 row-start-2 row-end-3 grid divide-y divide-gray-7 !border-l-0 dark:divide-gray-dark-7"
    >
      {hours.map((hour, idx) => {
        hour = new Date(hour);

        const time = lightFormat(hour, "hh:mm a");
        const end = hours.at(idx + 1) ?? lastHour;

        return (
          <time
            key={time}
            dateTime={time}
            className="flex h-full min-w-0 items-center justify-center p-2 text-xs text-gray-11 dark:text-gray-dark-11"
          >
            {time}
            {end && <> - {lightFormat(new Date(end), "hh:mm a")}</>}
          </time>
        );
      })}
    </div>
  );
};

export const TimetableWeekPanel: React.FC<{
  hours: Date[];
  periods?: API.Timetable.GET.Data["days"][number]["periods"];
}> = ({ hours, periods = [] }) => {
  return (
    <div
      className="pointer-events-auto grid h-full min-h-0 w-full divide-y divide-gray-7 dark:divide-gray-dark-7"
      style={{ gridTemplateRows: `repeat(${hours.length}, minmax(0, 1fr))` }}
    >
      {hours.map((date) => {
        const hour = new Date(date);
        const periodsInHour = periods.filter((period) => new Date(period.start).getHours() === hour.getHours());

        return (
          <div
            key={lightFormat(hour, "hh:mm a")}
            className="relative grid h-full w-full grid-flow-col items-start gap-0.5"
          >
            {periodsInHour.map((period, idx) => {
              const [start, end] = [period.start, period.end].map((time) => new Date(time));
              const offset = differenceInMinutes(start, hour);
              const duration = differenceInMinutes(end, start);

              return (
                <TooltipPrimitive.Root key={idx}>
                  <TooltipPrimitive.Trigger
                    className="absolute z-[1] w-full min-w-0 overflow-hidden rounded-lg bg-gray-3 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:hover:ring-gray-8 dark:bg-gray-dark-3 dark:focus:ring-gray-dark-7 dark:focus:hover:ring-gray-dark-8"
                    style={{
                      top: `${(offset / 60) * 1e2}%`,
                      height: `${(duration / 60) * 1e2}%`,
                      width: `${100 / periodsInHour.length}%`,
                      left: `${(100 / periodsInHour.length) * idx}%`,
                    }}
                  >
                    <div className="h-full text-left">
                      <div className="truncate text-sm tracking-wide text-gray-12 dark:text-gray-dark-12">
                        {period._type === "subject" ? period.subject.name : period.title}
                      </div>
                      <div className="truncate text-xs font-medium tracking-wide text-gray-11 dark:text-gray-dark-11">
                        {lightFormat(start, "hh:mm a")} - {lightFormat(end, "hh:mm a")}
                        {period._type === "subject" && <> &middot; {period.teacher.name}</>}
                      </div>
                    </div>
                  </TooltipPrimitive.Trigger>
                  <TooltipPrimitive.Content
                    sideOffset={3}
                    className="flex w-[270px] flex-col items-start justify-start gap-0.5 rounded-md bg-white p-4 shadow-md dark:bg-gray-dark-2 xs:w-[300px]"
                  >
                    <div className="font-semibold tracking-wide text-gray-12 dark:text-gray-dark-12">
                      {period._type === "subject" ? period.subject.name : period.title}
                    </div>
                    <div className="mb-1.5 text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">
                      {lightFormat(start, "hh:mm a")} - {lightFormat(end, "hh:mm a")}
                    </div>
                    {"description" in period && (
                      <div>
                        <span className="text-xs font-medium text-gray-11 dark:text-gray-dark-11">Description</span>
                        <p className="text-sm tracking-wide text-gray-12 dark:text-gray-dark-12">
                          {period.description}
                        </p>
                      </div>
                    )}
                    {"teacher" in period && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`/link/to/${period.teacher.username}`}
                        className="flex w-full items-center justify-start gap-3  rounded-md p-2 hover:bg-gray-4 dark:hover:bg-gray-dark-4"
                      >
                        <Avatar {...period.teacher} src={period.teacher.avatar ?? ""} />
                        <div className="truncate text-sm tracking-wide">{period.teacher.name}</div>
                      </a>
                    )}
                    <TooltipPrimitive.Arrow className="fill-white dark:fill-gray-dark-3" />
                  </TooltipPrimitive.Content>
                </TooltipPrimitive.Root>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
