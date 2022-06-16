import { Fragment, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import useSWR from "swr";
import Head from "next/head";
import dynamic from "next/dynamic";

import { cx } from "utils";
import { fetchAPI } from "api/client";
import { Select } from "components/Form";
import { useToast } from "components/Toast";

import type { NextPage } from "next";

const Avatar = dynamic(() => import("components/Avatar"));

const Students: NextPage = () => {
  const toasts = useToast();

  const [filter, setFilter] = useState<"" | "all">("");
  const [group, setGroup] = useState<"none" | "class">("none");

  const { data: students, mutate } = useSWR<API.Result<API.Teacher.GET.Students>>(
    `/api/teachers/me/students?filter=${filter}`
  );

  function groupData() {
    if (!students?.success) return [];

    const data = students.data.reduce((acc, cur) => {
      let key: string | undefined = "";

      if (group === "class") key = cur.class;

      key ??= "";

      return {
        ...acc,
        [key ?? ""]: [...(acc[key] ?? []), cur],
      };
    }, {} as Record<string, typeof students.data>);

    return Object.entries(data);
  }

  async function deleteStudent(id: string) {
    const toastID = toasts.add({ kind: "loading", description: "Deleting student..." });

    try {
      const result = await fetchAPI<API.Student.DELETE.Data>(`/api/students/${id}`, { method: "DELETE" });

      toasts.remove(toastID);

      if (result.success) {
        void mutate();
        toasts.add({ kind: "success", description: "Successfully deleted" });
      } else throw result.error;
    } catch (error) {
      console.error(error);
      toasts.remove(toastID);
      if (typeof error === "string") toasts.add({ kind: "error", description: error });
      if (typeof error === "object") toasts.add({ kind: "error", description: "Couldn't complete request" });
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Students &middot; Portal</title>
      </Head>
      <div className="flex items-center justify-start gap-7 p-5">
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            onClick={() => setFilter("")}
            className={cx("rounded-full px-4 py-1 text-sm tracking-wide focus:outline-none", [
              filter === "",
              "bg-black-a-9 text-white",
              "bg-gray-3 text-gray-12 hover:bg-gray-4 focus:ring-1 focus:ring-gray-6 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-6",
            ])}
          >
            Mine
          </button>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cx("rounded-full px-4 py-1 text-sm tracking-wide focus:outline-none", [
              filter === "all",
              "bg-black-a-9 text-white",
              "bg-gray-3 text-gray-12 hover:bg-gray-4 focus:ring-1 focus:ring-gray-6 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-6",
            ])}
          >
            All
          </button>
        </div>
        <div className="w-40">
          <Select required label="Group By" value={group} onValueChange={(v) => setGroup(v as typeof group)}>
            <Select.Item value="none">None</Select.Item>
            <Select.Item value="class">Class</Select.Item>
          </Select>
        </div>
      </div>
      <div className="space-y-3 p-5">
        {groupData().map(([groupKey, students]) => (
          <Fragment key={groupKey}>
            {groupKey && <h3 className="py-2 font-bold text-gray-11 dark:text-gray-dark-11">{groupKey}</h3>}
            {students.map((student) => (
              <div
                key={student.username}
                className="flex items-center gap-6 rounded bg-gray-4 p-4 text-sm text-gray-12 shadow dark:bg-gray-dark-4 dark:text-gray-dark-12"
              >
                <div className="flex items-center justify-start gap-1">
                  <Avatar name={student.name} src={student.avatar ?? ""} initials={student.initials} />
                </div>
                <div className="space-y-1 text-gray-12 dark:text-gray-dark-12">
                  <div title="Name" className="text-sm font-medium">
                    {student.name}
                  </div>
                  <div title="Age" className="text-xs">
                    {student.age}
                  </div>
                  <div title="Class" className="text-xs">
                    {student.class}
                  </div>
                  <div title="Sex" className="text-xs">
                    {student.gender === "M" ? "Male" : "Female"}
                  </div>
                  <div title="Username" className="text-xs">
                    {student.username}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void deleteStudent(String(student._id))}
                  className="rounded-full p-3 text-red-12 hover:bg-gray-5 focus:ring-1 focus:ring-gray-6 dark:text-red-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default Students;
