import { PlusSmIcon } from "@heroicons/react/solid";
import { useMemo, useState } from "react";
import Head from "next/head";

import { Email, Select } from "components/Form";

import type { NextPage } from "next";
import type { OneKey } from "types/utils";

type Value = {
  mail: string;
  relation: string;
};

const Test: NextPage = () => {
  const template = useMemo<Value>(() => ({ mail: "", relation: "" }), []);
  const [guardians, setGuardians] = useState<Value[]>([{ ...template }]);
  const guardianOptions = useMemo(
    () => [
      {
        id: "father",
        value: "Father",
      },
      {
        id: "mother",
        value: "Mother",
      },
      {
        id: "other",
        value: "Other",
      },
    ],
    []
  );

  const updateGuardian = ({ i, ...obj }: OneKey<Value> & { i: number }) =>
    setGuardians((guardians) =>
      guardians.map((a, b) => Object.assign(a, b === i && obj))
    );

  return (
    <main className="flex h-screen w-screen flex-row items-center justify-center bg-slate-200 font-inter dark:bg-slate-800">
      <Head>
        <title>Test</title>
      </Head>
      <div className="space-y-4 rounded-lg bg-white p-8">
        <ul className="space-y-3">
          {guardians.map(({ mail, relation }, i) => (
            <li
              key={i}
              className="flex flex-row items-end justify-start gap-x-3"
            >
              <div className="w-40 space-y-2">
                <Select
                  label="Relationship"
                  options={guardianOptions}
                  onChange={(v) =>
                    updateGuardian({ i, relation: v.id as string })
                  }
                  value={guardianOptions.find(({ id }) => id === relation)}
                />
              </div>
              <Email className="relative flex w-[20rem] flex-col items-start justify-start gap-y-2 font-inter">
                <Email.Field
                  userType="parent"
                  values={mail ? [{ mail }] : []}
                  onChange={([v]) => updateGuardian({ i, mail: v.mail })}
                  className="peer flex h-[3.75rem] w-full grow flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 rounded-lg border border-slate-200 bg-white p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
                />
                <Email.Label className="absolute left-3 -top-3 bg-white p-1 text-xs font-medium tracking-normal text-slate-600 transition-all peer-empty:top-1/2 peer-empty:-translate-y-1/2 peer-empty:text-sm peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                  Mail
                </Email.Label>
              </Email>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setGuardians([...guardians, { ...template }])}
          className="flex flex-row items-center justify-start gap-x-2 p-1"
        >
          <span className="rounded-full bg-sky-400 p-1 shadow">
            <PlusSmIcon className="h-5 w-5 fill-white" />
          </span>
          <span className="text-sm font-medium tracking-wide text-slate-600">
            Add Guardian
          </span>
        </button>
      </div>
    </main>
  );
};

export default Test;
