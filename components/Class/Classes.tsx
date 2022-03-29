import useSWR from "swr";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon, ExternalLinkIcon, TrashIcon } from "@heroicons/react/solid";

import { List } from "components";
import { fetchAPIEndpoint } from "utils";

import type { ApiResponse } from "types/api";
import type { GetClassData, GetClassesData } from "types/api/classes";

export const Classes: FunctionComponent = () => {
  const [activePage, setActivePage] = useState(0);
  const { data, mutate } = useSWR<ApiResponse<GetClassesData>>(`/api/classes?page=${activePage}`);

  async function deleteClass(id: string) {
    // NOTE: After Confirm From Modal

    try {
      await fetchAPIEndpoint(`/api/classes/${id}`, { method: "DELETE" });
      void mutate();
    } catch (error) {
      console.error("error");
    }
  }

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
          deleteClass={deleteClass}
        />
      ))}
    </List>
  );
};

const Row: FunctionComponent<RowProps> = ({ _id, deleteClass, name, order, subjectsCount }) => {
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
        <Action
          title="Delete"
          onClick={() => void deleteClass(String(_id))}
        >
          <TrashIcon className="h-5 w-5 fill-gray-500" />
        </Action>
      </div>
    </div>
  );
};

const Action: FunctionComponent<ActionProps> = ({ children, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-square cursor-pointer rounded-full p-2 hover:bg-slate-200"
    >
      {children}
      <span className="absolute -top-10 -left-4 hidden min-w-max rounded-md bg-white p-2.5 text-xs font-light tracking-wide text-slate-600 shadow group-hover:block">
        {title}
      </span>
    </div>
  );
};

interface ActionProps {
  title: string;
  onClick?: () => void;
}

interface RowProps extends GetClassData {
  deleteClass(id: string): Promise<void>;
}
