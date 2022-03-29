import useSWR from "swr";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon, ExternalLinkIcon, TrashIcon } from "@heroicons/react/solid";

import { List } from "components";

import type { ApiResponse } from "types/api";
import type { GetClassesData } from "types/api/classes";

export const Classes: FunctionComponent = () => {
  const [activePage, setActivePage] = useState(0);
  const { data } = useSWR<ApiResponse<GetClassesData>>(`/api/classes?page=${activePage}`);

  return (
    <List
      className="w-full"
      pagination={{
        ...data?.data,
        changePage: setActivePage,
      }}
    >
      {data?.data.classes.map((c) => (
        <Row
          {...c}
          key={c.order}
        />
      ))}
    </List>
  );
};

const Row: FunctionComponent<GetClassesData["classes"][number]> = ({ _id, name, order, subjectsCount }) => {
  return (
    <div
      className="grid w-full gap-x-10 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) max-content" }}
    >
      <div className="flex w-10 min-w-0 items-center justify-center text-sm text-gray-600">{order}.</div>
      <Link href={`/classes/${String(_id)}`}>
        <a className="min-w-0 space-y-1">
          <div className="tracking-wide text-gray-700">{name.long}</div>
          <div className="text-sm tracking-wide text-gray-500">
            <span>
              {name.short} {name.special} &middot;
            </span>{" "}
            <span>
              {subjectsCount} subject{subjectsCount !== 1 && "s"}
            </span>
          </div>
        </a>
      </Link>
      <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-3">
        <Action title="Move Up">
          <ArrowSmUpIcon className="h-5 w-5 fill-gray-500" />
        </Action>
        <Action title="Move Down">
          <ArrowSmDownIcon className="h-5 w-5 fill-gray-500" />
        </Action>
        <Action title="Open">
          <Link href={`/classes/${String(_id)}`}>
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="h-5 w-5 fill-gray-500" />
            </a>
          </Link>
        </Action>
        <Action title="Delete">
          <TrashIcon className="h-5 w-5 fill-gray-500" />
        </Action>
      </div>
    </div>
  );
};

const Action: FunctionComponent<{ title: string }> = ({ children, title }) => {
  return (
    <div className="group relative aspect-square cursor-pointer rounded-full p-2 hover:bg-slate-200">
      {children}
      <span className="absolute -top-10 -left-4 hidden min-w-max rounded-md bg-white p-2.5 text-xs font-light tracking-wide text-slate-600 shadow group-hover:block">
        {title}
      </span>
    </div>
  );
};
