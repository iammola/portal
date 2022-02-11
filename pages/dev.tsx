import Head from "next/head";
import { useState } from "react";

import { SubjectType } from "components/Create/Subject";

import type { NextPage } from "next";
import type { SubjectRecord } from "types/schema";

const Dev: NextPage = () => {
  const [value, setValue] = useState<SubjectRecord["__type"]>();

  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 font-inter dark:bg-slate-800">
      <Head>
        <title>Development Page</title>
        <meta name="description" content="Test Components" />
      </Head>
      <SubjectType className="w-[48.5rem] space-y-5 overflow-hidden rounded-xl bg-white px-14 py-16 shadow-lg">
        <SubjectType.Label className="font-medium text-slate-800">
          Choose a subject type
        </SubjectType.Label>
        <SubjectType.Options
          value={value}
          id="subjectType"
          onChange={setValue}
          className="flex w-full flex-row items-center justify-start gap-x-8"
        />
      </SubjectType>
    </main>
  );
};

export default Dev;
