import useSWR from "swr";
import { ArrowSmUpIcon, ArrowSmDownIcon, TrashIcon } from "@heroicons/react/solid";

import { List } from "./components";

import { Action } from "./Action";

export const Subjects: React.FC<{ id: string }> = ({ id }) => {
  const { data: { data } = {}, error } = useSWR<API.Response<API.Class.GET.Subjects>, API.Error>(
    `/api/classes/${id}/subjects?projection=name,order`
  );

  return (
    <List className="divide-slate-300 w-full divide-y">
      {error && "Error State component soon"}
      {data && !data.subjects.length && "Empty state component soon"}
      {data === error && new Array(3).fill(null).map((_, idx) => <Skeleton key={idx} />)}
      {data?.subjects.map((s) => (
        <Row
          {...s}
          key={String(s._id)}
        />
      ))}
    </List>
  );
};

const Row: React.FC<RowProps> = ({ __type, divisionsCount, name, order, teachersCount }) => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) repeat(2, max-content)" }}
    >
      <div className="text-gray-600 flex w-10 min-w-0 items-center justify-center text-sm">{order}.</div>
      <div className="text-gray-700 flex grow items-center justify-start gap-x-3 tracking-wide">
        <span className="text-gray-700 tracking-wide">{name.long}</span>-
        <span className="text-gray-500 text-sm">{name.short}</span>
      </div>
      <div className="flex items-center justify-center p-2.5">
        {__type === "base" && `${teachersCount ?? 0} teacher${teachersCount === 1 ? "" : "s"}`}
        {__type === "group" && `${divisionsCount ?? 0} division${divisionsCount === 1 ? "" : "s"}`}
      </div>
      <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-3">
        <Action title="Move Up">
          <ArrowSmUpIcon className="fill-gray-500 h-5 w-5" />
        </Action>
        <Action title="Move Down">
          <ArrowSmDownIcon className="fill-gray-500 h-5 w-5" />
        </Action>
        <Action title="Delete">
          <TrashIcon className="fill-gray-500 h-5 w-5" />
        </Action>
      </div>
    </div>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) repeat(2, max-content)" }}
    >
      <div className="bg-slate-300 aspect-square h-3 w-3 animate-pulse rounded-full" />
      <div className="w-full min-w-0 space-y-2">
        <div className="bg-slate-300 h-3 w-24 animate-pulse rounded-full" />
        <div className="bg-slate-300 h-3 w-40 animate-pulse rounded-full" />
      </div>
      <div className="flex min-w-0 items-center">
        <div className="bg-slate-300 h-3 w-20 animate-pulse rounded-full" />
      </div>
      {new Array(3).fill(null).map((_, idx) => (
        <div
          key={idx}
          className="bg-slate-300 h-4 w-4 animate-pulse rounded-full"
        />
      ))}
    </div>
  );
};

type RowProps = Pick<Schemas.Subject.Record<true>, "order" | "name" | "__type" | "teachersCount" | "divisionsCount">;
