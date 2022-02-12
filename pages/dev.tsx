import Head from "next/head";

import type { NextPage } from "next";

const Dev: NextPage = () => {
  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 dark:bg-slate-800">
      <Head>
        <title>Development Page</title>
        <meta name="description" content="Test Components" />
      </Head>
    </main>
  );
};

export default Dev;
