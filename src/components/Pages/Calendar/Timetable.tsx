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
}> = ({ hours, periods }) => {
  return (
    <div
      className="grid h-full w-full min-w-0 divide-x divide-gray-7 dark:divide-gray-dark-7"
      style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}
    >
      {hours.map((date) => {
        const hour = new Date(date);

        return (
          <div className="relative h-full w-full min-w-0" key={format(hour, "p")}>
            {periods
              ?.filter((period) => new Date(period.start).getHours() === hour.getHours())
              .map((period, idx) => {
                const minutesOffset = differenceInMinutes(new Date(period.start), hour);
                const periodDuration = differenceInMinutes(new Date(period.end), new Date(period.start));

                return (
                  <div
                    key={idx}
                    className="min-w-max"
                    style={{
                      width: `${(periodDuration / 60) * 1e2}%`,
                      marginLeft: `${(minutesOffset / 60) * 1e2}%`,
                    }}
                  >
                    {period._type === "subject" && period.subject.name} {periodDuration} mins
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
