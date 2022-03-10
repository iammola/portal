import Head from "next/head";
import { format } from "date-fns";

import { Breadcrumbs } from "components/Breadcrumbs";

import type { NextPage } from "next";

const Class: NextPage = () => {
  return (
    <main className="flex h-screen w-screen items-stretch justify-center overflow-hidden font-urbane">
      <Head>
        <title>Class-Name | **SessionIfNotCurrent** | GRS Portal</title>
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start">
        <header className="flex w-full flex-col bg-slate-100 px-8 pt-4 pb-6">
          <Breadcrumbs />
          <h3 className="text-4xl font-semibold capitalize text-slate-700">Key Stage 1</h3>
          <p className="flex gap-x-1 pt-2 text-xs font-light tracking-wide text-slate-500">
            <span>Since {format(new Date(2018, 5, 22), "do MMMM yyyy")}</span>
            {"•"}
            <span>5 students</span>
            {"•"}
            <span>3 subjects</span>
          </p>
        </header>
      </section>
    </main>
  );
};

export default Class;
