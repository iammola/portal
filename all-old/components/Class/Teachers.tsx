import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { ExternalLinkIcon, MailIcon } from "@heroicons/react/solid";

import { fetchAPIEndpoint } from "utils";
import { List, UserImage } from "all-old/components";

import AddTeacher from "./AddTeacher";

export const Teachers: React.FC<{ id: string }> = ({ id }) => {
  const [showAdd, setShowAdd] = useState(false);
  const {
    data: { data } = {},
    error,
    mutate,
  } = useSWR<API.Response<API.Class.GET.Teachers>, API.Error>(
    `/api/classes/${id}/teachers?projection=schoolMail,name.full,name.initials,name.title,image.portrait`
  );

  async function deleteTeacher(teacher: string) {
    try {
      await fetchAPIEndpoint<API.Class.DELETE.Teachers>(`/api/classes/${id}/teachers/${teacher}`, {
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
        className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded px-4 py-2 text-sm tracking-wide text-white shadow"
      >
        Invite Teacher
      </button>
      <List className="divide-slate-300 w-full divide-y">
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

const Row: React.FC<RowProps> = ({ _id, image, name, remove, schoolMail }) => {
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
            <a className="text-blue-600 tracking-wide">{name.full}</a>
          </Link>
          <div className="flex gap-x-2">
            <MailIcon className="fill-slate-500 h-5 w-5" />
            <a
              href={`mailto:${schoolMail}`}
              className="text-gray-500 flex gap-x-2 text-sm lowercase tracking-wide"
            >
              {schoolMail}
            </a>
          </div>
        </div>
      </div>
      <Link href={`/teachers/${String(_id)}`}>
        <a className="text-blue-600 flex min-w-0 items-center text-sm tracking-wide">
          Go to Profile
          <ExternalLinkIcon className="fill-blue-600 h-4 w-4" />
        </a>
      </Link>
      <button
        type="button"
        onClick={() => void remove(String(_id))}
        className="text-red-600 min-w-0 text-sm tracking-wide"
      >
        Remove
      </button>
    </div>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "minmax(0, 1fr) repeat(2, max-content)" }}
    >
      <div className="flex w-full min-w-0 items-center justify-start gap-4">
        <div className="bg-slate-300 aspect-square h-16 w-16 shrink-0 animate-pulse overflow-hidden rounded-full" />
        <div className="space-y-2">
          <div className="bg-slate-300 h-3 w-24 animate-pulse rounded-full" />
          <div className="bg-slate-300 h-3 w-40 animate-pulse rounded-full" />
        </div>
      </div>
      <div className="flex min-w-0 items-center">
        <div className="bg-slate-300 h-3 w-20 animate-pulse rounded-full" />
      </div>
      <div className="flex min-w-0 items-center">
        <div className="bg-slate-300 h-3 w-20 animate-pulse rounded-full" />
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
interface RowProps extends Schemas.Teacher.Schema {
  remove(id: string): Promise<void>;
}
