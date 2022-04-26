import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { formatDistance, formatDuration, intervalToDuration } from "date-fns";
import { CheckCircleIcon, MailIcon, XCircleIcon } from "@heroicons/react/solid";

import { List, UserImage } from "components";

export const Students: React.FC<{ id: string }> = ({ id }) => {
  const [activePage, setActivePage] = useState(0);
  const { data: { data } = {}, error } = useSWR<API.Response<API.Class.GET.Students.Data>, API.Error>(
    `/api/classes/${id}/students?page=${activePage}&projection=dob,schoolMail,name.full,name.initials,image.portrait`
  );

  return (
    <List
      className="w-full divide-y divide-slate-300"
      pagination={{
        page: activePage,
        changePage: setActivePage,
      }}
    >
      {error && "Error State component soon"}
      {data && !data.students.length && "Empty state component soon"}
      {data === error && new Array(3).fill(null).map((_, idx) => <Skeleton key={idx} />)}
      {data?.students.map((s) => (
        <Row
          {...s}
          key={String(s._id)}
        />
      ))}
    </List>
  );
};

const Row: React.FC<RowProps> = ({ _id, dob, image, name, online, schoolMail }) => {
  const age =
    dob &&
    formatDuration(intervalToDuration({ start: new Date(dob), end: new Date() }), {
      format: ["years"],
    });

  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "minmax(0, 1fr) max-content 25% max-content" }}
    >
      <div className="flex w-full min-w-0 items-center justify-start gap-4">
        <div className="aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <UserImage
            src={image.portrait ?? ""}
            fallbackText={name.initials}
            alt={`${name.full}'s Portrait Image`}
          />
        </div>
        <div className="space-y-1 text-sm">
          <span className="tracking-wide text-blue-800">{name.full}</span>
          <div className="flex gap-x-2">
            <MailIcon className="h-5 w-5 fill-slate-500" />
            <a
              href={`mailto:${schoolMail}`}
              className="flex gap-x-2 text-sm lowercase tracking-wide text-gray-500"
            >
              {schoolMail}
            </a>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 items-center text-sm tracking-wide text-slate-500">
        {dob ? <>{age} old</> : "No birthday"}
      </div>
      <div className="flex min-w-0 flex-col items-start justify-center gap-y-1">
        {!online ? (
          "No online data"
        ) : (
          <>
            <div className="flex items-center gap-x-1 text-sm text-slate-700">
              {online.state ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 fill-emerald-500" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <XCircleIcon className="h-5 w-5 fill-red-400" />
                  <span>Offline</span>
                </>
              )}
            </div>
            <div className="text-sm text-slate-500">
              {online.state ? "Since" : "Last seen"}{" "}
              {formatDistance(new Date(online.since), new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </div>
          </>
        )}
      </div>
      <Link href={`/students/${String(_id)}`}>
        <a className="flex min-w-0 items-center text-sm tracking-wide text-blue-600">View</a>
      </Link>
    </div>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "minmax(0, 1fr) max-content 25% max-content" }}
    >
      <div className="flex w-full min-w-0 items-center justify-start gap-4">
        <div className="aspect-square h-16 w-16 shrink-0 animate-pulse overflow-hidden rounded-full bg-slate-300" />
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded-full bg-slate-300" />
          <div className="h-3 w-40 animate-pulse rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="flex min-w-0 items-center">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-300" />
      </div>
      <div className="flex min-w-0 items-center space-y-2">
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-300" />
        <div className="h-3 w-40 animate-pulse rounded-full bg-slate-300" />
      </div>
      <div className="flex min-w-0 items-center">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

interface RowProps extends Pick<Schemas.Student.Record, "_id" | "dob" | "schoolMail"> {
  image: Pick<Schemas.Student.Record["image"], "portrait">;
  name: Pick<Schemas.Student.Record["name"], "full" | "initials">;
  online?: {
    since: Date;
    state: boolean;
  } | null;
}