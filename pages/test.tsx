import { useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";
import { classNames } from "utils";

import type { NextPage } from "next";

const Test: NextPage = () => {
  const [value, setValue] = useState("");

  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 dark:bg-slate-800">
      <Head>
        <title>Test</title>
      </Head>
      <form className="rounded-lg bg-white p-8">
        <div className="w-[22.5rem]">
          <Input.Password
            required
            value={value}
            id="password"
            label="Password"
            onChange={setValue}
            className={(valid) =>
              classNames(
                "h-[3.75rem] w-[22.5rem] overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                {
                  "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                    valid === true,
                  "invalid:ring-red-400 focus:invalid:ring-red-400":
                    valid === false,
                }
              )
            }
            validators={[
              {
                regex: /.{8}/,
                message: "At least 8 characters",
              },
              {
                regex: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+/,
                message:
                  "Must include a number, a lowercase and uppercase character",
              },
            ]}
          />
        </div>
      </form>
    </main>
  );
};

export default Test;
