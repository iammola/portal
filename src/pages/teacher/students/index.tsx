import { Fragment, useState } from "react";
import { getCookies } from "cookies-next";
import useSWR from "swr";
import Head from "next/head";

import { Avatar } from "components";
import { Select } from "components/Form";
import { cx, USER_ID_COOKIE } from "utils";

import type { NextPage } from "next";

const Students: NextPage = () => {
  const cookies = getCookies();
  const [filter, setFilter] = useState<"" | "all">("");
  const [group, setGroup] = useState<"none" | "class">("none");

  const { data: students } = useSWR<API.Result<API.Teacher.GET.Students>>(
    `/api/teachers/${cookies[USER_ID_COOKIE]}/students?filter=${filter}`
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

  return (
    <Fragment>
      <Head>
        <title>Students &middot; Portal</title>
      </Head>
      <div className="flex items-center justify-start gap-2">
        <button
          type="button"
          onClick={() => setFilter("")}
          className={cx("rounded p-3 ring-1 ring-gray-6 dark:ring-gray-dark-6", [
            filter === "",
            "bg-gray-9 text-white hover:bg-gray-10 dark:bg-gray-dark-9 dark:hover:bg-gray-dark-10",
            "bg-gray-3 text-gray-12 hover:bg-gray-4 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4",
          ])}
        >
          My Students
        </button>
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cx("rounded p-3 ring-1 ring-gray-6 dark:ring-gray-dark-6", [
            filter === "all",
            "bg-gray-9 text-white hover:bg-gray-10 dark:bg-gray-dark-9 dark:hover:bg-gray-dark-10",
            "bg-gray-3 text-gray-12 hover:bg-gray-4 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:hover:bg-gray-dark-4",
          ])}
        >
          All Students
        </button>
      </div>
      <Select label="Group By" value={group} onValueChange={(v) => setGroup(v as typeof group)}>
        <Select.Item value="none">None</Select.Item>
        <Select.Item value="class">Class</Select.Item>
      </Select>
      <div className="space-y-3">
        {groupData().map(([groupKey, students]) => (
          <Fragment key={groupKey}>
            {groupKey && <h3 className="py-2 font-bold text-gray-11 dark:text-gray-dark-11">{groupKey}</h3>}
            {students.map((student) => (
              <div
                key={student.username}
                className="flex items-center gap-2 text-sm text-gray-12 dark:text-gray-dark-12"
              >
                <div className="flex items-center justify-start gap-1">
                  <Avatar name={student.name} src={student.avatar ?? ""} initials={student.initials} />
                </div>
                <span className="text-base text-gray-11 dark:text-gray-dark-11">&middot;</span>
                <div className="flex items-center justify-start gap-1">
                  <span className="font-medium">Name:</span> <span>{student.name}</span>
                </div>
                <span className="text-base text-gray-11 dark:text-gray-dark-11">&middot;</span>
                <div className="flex items-center justify-start gap-1">
                  <span className="font-medium">Age:</span> <span>{student.age}</span>
                </div>
                <span className="text-base text-gray-11 dark:text-gray-dark-11">&middot;</span>
                <div className="flex items-center justify-start gap-1">
                  <span className="font-medium">Class:</span> <span>{student.class}</span>
                </div>
                <span className="text-base text-gray-11 dark:text-gray-dark-11">&middot;</span>
                <div className="flex items-center justify-start gap-1">
                  <span className="font-medium">Sex:</span> <span>{student.gender === "M" ? "Male" : "Female"}</span>
                </div>
                <span className="text-base text-gray-11 dark:text-gray-dark-11">&middot;</span>
                <div className="flex items-center justify-start gap-1">
                  <span className="font-medium">Username:</span> <span>{student.username}</span>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default Students;
