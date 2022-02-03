import Head from "next/head";

import type { NextPage } from "next";

const CreateStudent: NextPage = () => {
  return (
    <main className="flex h-full min-h-screen w-screen flex-row items-stretch justify-center bg-slate-50 font-poppins dark:bg-slate-900">
      <Head>
        <title>Create Student | GRIS Portal</title>
        <meta name="description" content="Create student" />
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start py-10">
        <h1 className="p-10 pt-0 text-5xl font-semibold text-slate-600 dark:text-slate-300">
          <span>Create</span>{" "}
          <span className="bg-gradient-to-br from-amber-300 to-amber-600 bg-clip-text text-transparent">
            Student
          </span>
        </h1>
      </section>
    </main>
  );
};

export default CreateStudent;
