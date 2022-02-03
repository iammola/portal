import { useState } from "react";
import Head from "next/head";

import Avatar from "components/Form/Avatar";

import type { NextPage } from "next";

const Test: NextPage = () => {
  const [value, setValue] = useState<File>();

  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 font-inter dark:bg-slate-800">
      <Head>
        <title>Test</title>
      </Head>
      <form className="rounded-lg bg-white p-8">
        <Avatar value={value} onChange={setValue} />
      </form>
    </main>
  );
};

export default Test;
