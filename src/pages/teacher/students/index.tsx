import { Fragment } from "react";
import { getCookies } from "cookies-next";
import useSWR from "swr";
import Head from "next/head";

import { Avatar } from "components";
import { USER_ID_COOKIE } from "utils";

import type { NextPage } from "next";

const Students: NextPage = () => {
  const cookies = getCookies();

  const { data: students } = useSWR<API.Result<API.Teacher.GET.Students>>(
    `/api/teachers/${cookies[USER_ID_COOKIE]}/students`
  );

  return (
    <Fragment>
      <Head>
        <title>Students &middot; Portal</title>
      </Head>
      <div className="space-y-3">
        {students?.success &&
          students.data.map((student) => (
            <div key={student.username} className="flex items-center gap-2 text-sm text-gray-12 dark:text-gray-dark-12">
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
      </div>
    </Fragment>
  );
};

export default Students;
