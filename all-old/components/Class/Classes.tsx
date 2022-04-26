import useSWR from "swr";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowSmDownIcon, ArrowSmUpIcon, ExternalLinkIcon, TrashIcon } from "@heroicons/react/solid";

import { List } from "all-old/components";
import { fetchAPIEndpoint } from "utils";

import { Action } from "./Action";
import { Delete } from "./Delete";

export const Classes: React.FC = () => {
  const [deleteId, setDeleteId] = useState("");
  const [activePage, setActivePage] = useState(0);
  const { data, error, mutate } = useSWR<API.Response<API.Class.GET.AllData>, API.Error>(
    `/api/classes?page=${activePage}`
  );

  async function deleteClass(id: string) {
    try {
      await fetchAPIEndpoint(`/api/classes/${id}`, { method: "DELETE" });
      void mutate().then(() => setDeleteId(""));
    } catch (error: unknown) {
      console.error("error");
    }
  }

  return (
    <Fragment>
      <List
        className="divide-slate-300 w-full divide-y"
        pagination={{
          ...data?.data,
          changePage: setActivePage,
        }}
      >
        {error && "Error State component soon"}
        {data && !data.data.classes.length && "Empty state component soon"}
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

const Row: React.FC<RowProps> = ({ _id, triggerDelete, name, order, subjectsCount }) => {
  return (
    <div
      className="grid w-full gap-x-10 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) max-content" }}
    >
      <div className="text-gray-600 flex w-10 min-w-0 items-center justify-center text-sm">{order}.</div>
      <Link href={`/classes/${String(_id)}`}>
        <a className="min-w-0 space-y-1">
          <div className="text-gray-700 tracking-wide">{name.long}</div>
          <div className="text-gray-500 text-sm tracking-wide">
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
          <ArrowSmUpIcon className="fill-gray-500 h-5 w-5" />
        </Action>
        <Action title="Move Down">
          <ArrowSmDownIcon className="fill-gray-500 h-5 w-5" />
        </Action>
        <Action title="Open">
          <Link href={`/classes/${String(_id)}`}>
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="fill-gray-500 h-5 w-5" />
            </a>
          </Link>
        </Action>
        <Action
          title="Delete"
          onClick={triggerDelete}
        >
          <TrashIcon className="fill-gray-500 h-5 w-5" />
        </Action>
      </div>
    </div>
  );
};

const Skeleton: React.FC = () => {
  return (
    <div
      className="grid w-full items-center gap-x-28 py-5"
      style={{ gridTemplateColumns: "max-content minmax(0, 1fr) max-content" }}
    >
      <div className="bg-slate-300 aspect-square h-3 w-3 animate-pulse rounded-full" />
      <div className="w-full min-w-0 space-y-2">
        <div className="bg-slate-300 h-3 w-24 animate-pulse rounded-full" />
        <div className="bg-slate-300 h-3 w-40 animate-pulse rounded-full" />
      </div>
      <div className="flex min-w-0 items-center gap-x-4">
        {new Array(4).fill(null).map((_, idx) => (
          <div
            key={idx}
            className="bg-slate-300 h-4 w-4 animate-pulse rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
interface RowProps extends API.Class.GET.Data {
  triggerDelete(): void;
}
