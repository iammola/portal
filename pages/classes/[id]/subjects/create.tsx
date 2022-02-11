import Head from "next/head";
import { useState } from "react";

import { Select } from "components/Form";
import { SubjectType } from "components/Create/Subject";

import type { NextPage } from "next";
import type { SubjectRecord } from "types/schema";
import type { Value as SelectValue } from "components/Form/Select";

const CreateSubject: NextPage = () => {
  const [__type, setType] = useState<SubjectRecord["__type"]>();
  const [selectedClass, setSelectedClass] = useState<SelectValue>();

  return (
    <main className="flex h-full min-h-screen w-screen flex-row items-stretch justify-center bg-slate-200 font-poppins">
      <Head>
        <title>Create Subject | Portal | GRS™</title>
        <meta name="description" content="Page for Subject Creation" />
      </Head>
      <section className="flex w-full grow flex-col items-center justify-center">
        <form className="w-[35rem] space-y-10 rounded-2xl bg-white px-10 py-8 shadow-lg">
          <h1 className="text-center text-4xl font-bold text-slate-600">
            <span>Create</span>{" "}
            <span className="bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Subject
            </span>
          </h1>
          <div className="space-y-8">
            <Select
              options={[]}
              label="Class name"
              value={selectedClass}
              onChange={setSelectedClass}
            />
            <SubjectType className="w-full space-y-5">
              <SubjectType.Label className="font-medium text-slate-800">
                Choose a subject type
              </SubjectType.Label>
              <SubjectType.Options
                value={__type}
                id="subjectType"
                onChange={setType}
                className="flex w-full flex-row items-center justify-start md:gap-x-3 lg:gap-x-5"
              />
            </SubjectType>
          </div>
          <button
            type="submit"
            className="mt-5 w-full overflow-hidden rounded-lg bg-blue-500 py-3 px-5 font-bold uppercase tracking-wide text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:hover:ring-blue-600"
          >
            Finish
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateSubject;
