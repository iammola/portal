import useSWR from "swr";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { ExternalLinkIcon, MailIcon } from "@heroicons/react/solid";

import { fetchAPIEndpoint } from "utils";
import { List, UserImage } from "components";

import AddTeacher from "./AddTeacher";

import type {
  ApiError,
  ApiResponse,
  GetClassTeachersData as Data,
  DeleteClassTeacherData as DeleteData,
} from "types/api";
import type { TeacherSchema } from "types/schema";

export const Teachers: FunctionComponent<{ id: string }> = ({ id }) => {
  const [showAdd, setShowAdd] = useState(false);
  const {
    data: { data } = {},
    error,
    mutate,
  } = useSWR<ApiResponse<Data>, ApiError>(
    `/api/classes/${id}/teachers?projection=schoolMail,name.full,name.initials,name.title,image.portrait`
  );

  async function deleteTeacher(teacher: string) {
    try {
      await fetchAPIEndpoint<DeleteData>(`/api/classes/${id}/teachers/${teacher}`, {
        method: "DELETE",
      });
      await mutate();
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-end justify-center gap-y-4 py-5">
      <button
        onClick={() => setShowAdd(true)}
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-sm tracking-wide text-white shadow hover:bg-blue-600"
      >
        Invite Teacher
      </button>
      <List className="w-full divide-y divide-slate-300">
        {error && "Error State component soon"}
        {data && !data.teachers.length && "Empty state component soon"}
        {data === error && new Array(3).fill(null).map((_, idx) => <Skeleton key={idx} />)}
        {data?.teachers.map((item) => (
          <Row
            {...item}
            key={String(item._id)}
            remove={deleteTeacher}
          />
        ))}
      </List>
      <AddTeacher
        show={showAdd}
        {...{ id, mutate }}
        onClose={setShowAdd}
      />
    </div>
  );
};

const Row: FunctionComponent<RowProps> = ({ _id, image, name, remove, schoolMail }) => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "minmax(0, 1fr) repeat(2, max-content)" }}
    >
      <div className="flex w-full min-w-0 items-center justify-start gap-4">
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
        <a className="flex min-w-0 items-center text-sm tracking-wide text-blue-600">
          Go to Profile
          <ExternalLinkIcon className="h-4 w-4 fill-blue-600" />
        </a>
      </Link>
      <button
        type="button"
        onClick={() => void remove(String(_id))}
        className="min-w-0 text-sm tracking-wide text-red-600"
      >
        Remove
      </button>
    </div>
  );
};

const Skeleton: FunctionComponent = () => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "minmax(0, 1fr) repeat(2, max-content)" }}
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
      <div className="flex min-w-0 items-center">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

interface RowProps extends TeacherSchema {
  remove(id: string): Promise<void>;
}
