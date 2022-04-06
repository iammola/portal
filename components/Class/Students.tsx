import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { formatDistance, formatDuration, intervalToDuration } from "date-fns";
import { CheckCircleIcon, MailIcon, XCircleIcon } from "@heroicons/react/solid";

import { List, UserImage } from "components";

import type { StudentRecord } from "types/schema";

export const Students: FunctionComponent<{ id: string }> = () => {
  const [activePage, setActivePage] = useState(0);

  return (
    <List
      className="w-full divide-y divide-slate-300"
      pagination={{
        page: activePage,
        changePage: setActivePage,
      }}
    />
  );
};

const Row: FunctionComponent<RowProps> = ({ _id, dob, image, name, online, schoolMail }) => {
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
        <div className="flex items-center gap-x-1 text-sm text-slate-700">
          {online.state ? (
            <>
              <CheckCircleIcon className="h-5 w-5 fill-emerald-500" />
              Online
            </>
          ) : (
            <>
              <XCircleIcon className="h-5 w-5 fill-red-400" />
              Offline
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
      </div>
      <Link href={`/students/${String(_id)}`}>
        <a className="flex min-w-0 items-center text-sm tracking-wide text-blue-600">View</a>
      </Link>
    </div>
  );
};

interface RowProps extends Pick<StudentRecord, "_id" | "dob" | "schoolMail"> {
  image: Pick<StudentRecord["image"], "portrait">;
  name: Pick<StudentRecord["name"], "full" | "initials">;
  online: {
    since: Date;
    state: boolean;
  };
}
