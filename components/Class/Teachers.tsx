import useSWR from "swr";
import Link from "next/link";
import { FunctionComponent } from "react";
import { ExternalLinkIcon, MailIcon } from "@heroicons/react/solid";

import { List, UserImage } from "components";

import type { ApiResponse } from "types/api";
import type { TeacherSchema } from "types/schema";
import type { GetClassTeachersData as Data } from "types/api/classes";

export const Teachers: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data: res } = useSWR<ApiResponse<Data>>(
    `/api/classes/${id}/teachers?projection=schoolMail,name.full,name.initials,name.title,image.portrait`
  );

  return (
    <div className="flex flex-col items-end justify-center gap-y-4 py-5">
      <button className="rounded bg-blue-500 px-4 py-2 text-sm tracking-wide text-white shadow hover:bg-blue-600">
        Invite Teacher
      </button>
      <List className="w-full divide-y divide-slate-300">
        {res?.data.teachers.map((item) => (
          <Row key={String(item._id)} {...item} />
        ))}
      </List>
    </div>
  );
};

const Row: FunctionComponent<TeacherSchema> = ({ _id, image, name, schoolMail }) => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "1fr repeat(2, max-content)" }}
    >
      <div className="flex w-full items-center justify-start gap-4">
        <div className="aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <UserImage
            src={image.portrait ?? ""}
            alt={`${name.full}'s Image`}
            fallbackText={name.initials}
          />
        </div>
        <div className="space-y-1 text-sm">
          <Link href={`/teachers/${String(_id)}`}>
            <a className="tracking-wide text-blue-600">{name.full}</a>
          </Link>
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
      <Link href={`/teachers/${String(_id)}`}>
        <a className="flex items-center text-sm tracking-wide text-blue-600">
          Go to Profile
          <ExternalLinkIcon className="h-4 w-4 fill-blue-600" />
        </a>
      </Link>
      <button type="button" className="text-sm tracking-wide text-red-600">
        Remove
      </button>
    </div>
  );
};
