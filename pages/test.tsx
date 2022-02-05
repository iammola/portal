import { useMemo, useState } from "react";
import Head from "next/head";

import { Email, Select } from "components/Form";

import type { NextPage } from "next";
import type { OneKey } from "types/utils";

type Value = {
  mail: string;
  relationship: string;
};

const Test: NextPage = () => {
  const [guardians, setGuardians] = useState<Value[]>([
    { mail: "", relationship: "" },
  ]);
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
      <ul className="flex flex-col items-start justify-start gap-y-3 rounded-lg bg-white p-8">
        {guardians.map((guardian, i) => (
          <li
            key={guardian.mail}
            className="flex flex-row items-end justify-start gap-x-3"
          >
            <div className="w-40 space-y-2">
              <Select
                label="Relationship"
                options={guardianOptions}
                onChange={(v) =>
                  updateGuardian({ i, relationship: v.id as string })
                }
                value={guardianOptions.find(
                  ({ id }) => id === guardian.relationship
                )}
              />
            </div>
            <Email className="relative flex w-[20rem] flex-col items-start justify-start gap-y-2 font-inter">
              <Email.Field
                userType="parent"
                values={guardian.mail ? [{ schoolMail: guardian.mail }] : []}
                onChange={([v]) => updateGuardian({ i, mail: v.schoolMail })}
                className="peer flex h-[3.75rem] w-full grow flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 rounded-lg border border-slate-200 bg-white p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
              />
              <Email.Label className="absolute left-3 -top-3 bg-white p-1 text-xs font-medium tracking-normal text-slate-600 transition-all peer-empty:top-1/2 peer-empty:-translate-y-1/2 peer-empty:text-sm peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                Mail
              </Email.Label>
            </Email>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Test;
