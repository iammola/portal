import Head from "next/head";

import Input from "components/Global/Input";

import type { NextPage } from "next";

const Test: NextPage = () => {
  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 font-poppins dark:bg-slate-800">
      <Head>
        <title>Test</title>
      </Head>
      <form className="rounded-lg bg-white p-8">
        <div className="w-[15rem]">
          <Input.Select label="Title" />
        </div>
      </form>
    </main>
  );
};

export default Test;
