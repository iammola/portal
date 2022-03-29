import useSWR from "swr";
import Link from "next/link";
import { Fragment, FunctionComponent, useState } from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon, ExternalLinkIcon, TrashIcon } from "@heroicons/react/solid";

import { List } from "components";
import { fetchAPIEndpoint } from "utils";

import { Delete } from "./Delete";

import type { ApiError, ApiResponse } from "types/api";
import type { GetClassData, GetClassesData } from "types/api/classes";

export const Classes: FunctionComponent = () => {
  const [deleteId, setDeleteId] = useState("");
  const [activePage, setActivePage] = useState(0);
  const { data, error, mutate } = useSWR<ApiResponse<GetClassesData>, ApiError>(`/api/classes?page=${activePage}`);

  async function deleteClass(id: string) {
    try {
      await fetchAPIEndpoint(`/api/classes/${id}`, { method: "DELETE" });
      void mutate().then(() => setDeleteId(""));
    } catch (error) {
      console.error("error");
    }
  }

  return (
    <Fragment>
      <List
        className="w-full divide-y divide-slate-300"
        pagination={{
          ...data?.data,
          changePage: setActivePage,
        }}
      >
        {data === error && new Array(3).fill(null).map((_, idx) => <Skeleton key={idx} />)}
        {data?.data.classes.map((c) => (
          <Row
            {...c}
            key={c.order}
            triggerDelete={() => setDeleteId(String(c._id))}
          />
        ))}
      </List>
      <Delete
        show={!!deleteId}
        close={() => setDeleteId("")}
        delete={() => void deleteClass(deleteId)}
      />
    </Fragment>
  );
};

const Row: FunctionComponent<RowProps> = ({ _id, triggerDelete, name, order, subjectsCount }) => {
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
          onClick={triggerDelete}
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

const Skeleton: FunctionComponent = () => {
  return (
    <div
      className="grid w-full items-center gap-x-28 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) max-content" }}
    >
      <div className="aspect-square h-3 w-3 animate-pulse rounded-full bg-slate-300" />
      <div className="w-full min-w-0 space-y-2">
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-300" />
        <div className="h-3 w-40 animate-pulse rounded-full bg-slate-300" />
      </div>
      <div className="flex min-w-0 items-center gap-x-4">
        {new Array(4).fill(null).map((_, idx) => (
          <div
            key={idx}
            className="h-4 w-4 animate-pulse rounded-full bg-slate-300"
          />
        ))}
      </div>
    </div>
  );
};

interface ActionProps {
  title: string;
  onClick?: () => void;
}

interface RowProps extends GetClassData {
  triggerDelete(): void;
}
