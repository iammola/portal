import useSWR from "swr";
import { FunctionComponent } from "react";
import { ArrowSmUpIcon, ArrowSmDownIcon, TrashIcon } from "@heroicons/react/solid";

import { List } from "components";

import { Action } from "./Action";

import type { SubjectRecord } from "types/schema";
import type { ApiResponse, ApiError, GetClassSubjectsData } from "types/api";

export const Subjects: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data: { data } = {}, error } = useSWR<ApiResponse<GetClassSubjectsData>, ApiError>(
    `/api/classes/${id}/subjects?projection=name,order`
  );

  return (
    <List className="w-full divide-y divide-slate-300">
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

const Row: FunctionComponent<RowProps> = ({ __type, divisionsCount, name, order, teachersCount }) => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) repeat(2, max-content)" }}
    >
      <div className="flex w-10 min-w-0 items-center justify-center text-sm text-gray-600">{order}.</div>
      <div className="flex grow items-center justify-start gap-x-3 tracking-wide text-gray-700">
        <span className="tracking-wide text-gray-700">{name.long}</span>-
        <span className="text-sm text-gray-500">{name.short}</span>
      </div>
      <div className="flex items-center justify-center p-2.5">
        {__type === "base" && `${teachersCount ?? 0} teacher${teachersCount === 1 ? "" : "s"}`}
        {__type === "group" && `${divisionsCount ?? 0} division${divisionsCount === 1 ? "" : "s"}`}
      </div>
      <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-3">
        <Action title="Move Up">
          <ArrowSmUpIcon className="h-5 w-5 fill-gray-500" />
        </Action>
        <Action title="Move Down">
          <ArrowSmDownIcon className="h-5 w-5 fill-gray-500" />
        </Action>
        <Action title="Delete">
          <TrashIcon className="h-5 w-5 fill-gray-500" />
        </Action>
      </div>
    </div>
  );
};

const Skeleton: FunctionComponent = () => {
  return (
    <div
      className="grid w-full gap-x-28 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) repeat(2, max-content)" }}
    >
      <div className="aspect-square h-3 w-3 animate-pulse rounded-full bg-slate-300" />
      <div className="w-full min-w-0 space-y-2">
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-300" />
        <div className="h-3 w-40 animate-pulse rounded-full bg-slate-300" />
      </div>
      <div className="flex min-w-0 items-center">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-300" />
      </div>
      {new Array(3).fill(null).map((_, idx) => (
        <div
          key={idx}
          className="h-4 w-4 animate-pulse rounded-full bg-slate-300"
        />
      ))}
    </div>
  );
};

type RowProps = Pick<SubjectRecord<true>, "order" | "name" | "__type" | "teachersCount" | "divisionsCount">;
