import { differenceInMinutes, format } from "date-fns";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const DaysPanel: React.FC<{ activeDays: number[] }> = ({ activeDays }) => {
  return (
    <div
      style={{ gridTemplateRows: `repeat(${activeDays.length}, minmax(0, 1fr))` }}
      className="col-start-1 col-end-2 row-start-2 row-end-3 grid divide-y divide-gray-7 !border-l-0 dark:divide-gray-dark-7"
    >
      {activeDays.map((day) => (
        <div
          key={day}
          className="flex h-full min-h-0 w-full items-center justify-center px-2 text-gray-11 dark:text-gray-dark-11"
        >
          {days[day]}
        </div>
      ))}
    </div>
  );
};

export const HoursPanel: React.FC<{ hours: Date[] }> = ({ hours }) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}
      className="col-start-2 col-end-3 row-start-1 row-end-2 grid divide-x divide-gray-7 !border-t-0 dark:divide-gray-dark-7"
    >
      {hours.map((hour) => {
        const time = format(new Date(hour), "p");

        return (
          <time
            key={time}
            dateTime={time}
            className="h-full min-w-0 p-2 text-center text-sm text-gray-11 dark:text-gray-dark-11"
          >
            {time}
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
      className="grid h-full w-full min-w-0 divide-x divide-gray-7 dark:divide-gray-dark-7"
      style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}
    >
      {hours.map((date) => {
        const hour = new Date(date);
        const periodsInHour = periods.filter((period) => new Date(period.start).getHours() === hour.getHours());

        return (
          <div
            key={format(hour, "p")}
            className="grid h-full w-full min-w-0 grid-cols-[100%] items-center justify-start p-2"
          >
            {periodsInHour.map((period, idx) => {
              const [start, end] = [period.start, period.end].map((time) => new Date(time));
              const offset = differenceInMinutes(start, hour);
              const duration = differenceInMinutes(end, start);

              return (
                <div
                  key={idx}
                  className="relative z-[1] min-w-max rounded-lg bg-gray-3 p-2 py-1.5 text-gray-12 dark:bg-gray-dark-3 dark:text-gray-dark-12"
                  style={{
                    width: `${(duration / 60) * 1e2}%`,
                    marginLeft: `${(offset / 60) * 1e2}%`,
                  }}
                >
                  <div className="text-sm tracking-wide text-gray-12 dark:text-gray-dark-12">
                    {period._type === "subject" ? period.subject.name : period.title}
                  </div>
                  <div className="text-xs font-medium tracking-wide text-gray-11 dark:text-gray-dark-11">
                    {format(start, "p")} - {format(end, "p")}
                    {period._type === "subject" && <> &middot; {period.teacher.name}</>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
