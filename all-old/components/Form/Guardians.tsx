import { PlusSmIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useMemo } from "react";

import { Select, Email } from "./components/Form";

const Guardians: Guardians = ({ values = [], onChange }) => {
  const guardianTemplate = useMemo<Value>(() => ({ mail: "", relation: "" }), []);
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

  const handleChange = ({ i, ...obj }: Utils.OneKey<Value> & { i: number }) =>
    onChange(values.map((a, b) => Object.assign(a, b === i && obj)));

  const addRow = useCallback(
    () => onChange([...values, { ...guardianTemplate }]),
    [guardianTemplate, onChange, values]
  );

  useEffect(() => {
    if (values.length === 0) addRow();
  }, [addRow, values.length]);

  return (
    <div className="space-y-4 rounded-lg bg-white p-8">
      <ul className="space-y-3">
        {values.map(({ mail, relation }, i) => (
          <li
            key={i}
            className="flex flex-row items-end justify-start gap-x-3"
          >
            <div className="w-40 space-y-2">
              <Select
                label="Relationship"
                options={guardianOptions}
                value={guardianOptions.find(({ id }) => id === relation)}
                onChange={(v) => handleChange({ i, relation: v.id as string })}
              />
            </div>
            <Email className="relative flex w-[20rem] flex-col items-start justify-start gap-y-2 font-inter">
              <Email.Field
                userType="parent"
                values={mail ? [{ mail }] : []}
                onChange={([v]) => handleChange({ i, mail: v.mail })}
                className="border-slate-200 focus:ring-blue-400 peer flex h-[3.75rem] w-full grow flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 rounded-lg border bg-white p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none"
              />
              <Email.Label className="text-slate-600 absolute left-3 -top-3 bg-white p-1 text-xs font-medium tracking-normal transition-all peer-empty:top-1/2 peer-empty:-translate-y-1/2 peer-empty:text-sm peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs">
                Mail
              </Email.Label>
            </Email>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={addRow}
        className="flex flex-row items-center justify-start gap-x-2 p-1"
      >
        <span className="bg-sky-400 rounded-full p-1 shadow">
          <PlusSmIcon className="h-5 w-5 fill-white" />
        </span>
        <span className="text-slate-600 text-sm font-medium tracking-wide">Add Guardian</span>
      </button>
    </div>
  );
};

type Value = {
  mail: string;
  relation: string;
};

type Guardians = React.FC<{
  values?: Value[];
  onChange(v: Value[]): void;
}>;

export default Guardians;
