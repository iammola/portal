import useSWR from "swr";
import { FunctionComponent } from "react";

import { List } from "components";

import type { SubjectRecord } from "types/schema";
import type { ApiResponse, ApiError } from "types/api";
import type { GetClassSubjectsData } from "types/api/classes";

export const Subjects: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data: { data } = {}, error } = useSWR<ApiResponse<GetClassSubjectsData>, ApiError>(
    `/api/classes/${id}/subjects?projection=name,order`
  );

  return (
    <List className="w-full divide-y divide-slate-300">
      {error && "Error State component soon"}
      {data && !data.subjects.length && "Empty state component soon"}
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
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) max-content" }}
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
    </div>
  );
};

type RowProps = Pick<SubjectRecord<true>, "order" | "name" | "__type" | "teachersCount" | "divisionsCount">;
