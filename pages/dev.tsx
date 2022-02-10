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
      <SubjectType className="w-[35rem] space-y-3 overflow-hidden rounded-xl bg-white shadow-lg">
        <SubjectType.Label className="">Select subject type</SubjectType.Label>
        <SubjectType.Options
          value={value}
          id="subjectType"
          onChange={setValue}
          className="flex flex-row items-center justify-start gap-x-4"
        />
      </SubjectType>
    </main>
  );
};

export default Dev;
