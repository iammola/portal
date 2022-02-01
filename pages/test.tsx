import { useMemo, useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";

import type { NextPage } from "next";

const Test: NextPage = () => {
  const [value, setValue] = useState<{ id: unknown; value: string }>();
  const options = useMemo(
    () => [
      {
        id: "1",
        value: "Option 1",
      },
      {
        id: "2",
        value: "Option 2",
      },
    ],
    []
  );

  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 font-inter dark:bg-slate-800">
      <Head>
        <title>Test</title>
      </Head>
      <form className="rounded-lg bg-white p-8">
        <div className="w-[15rem]">
          <Input.Select
            label="Title"
            onChange={setValue}
            {...{ options, value }}
          />
        </div>
      </form>
    </main>
  );
};

export default Test;
