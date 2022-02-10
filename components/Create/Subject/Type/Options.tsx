import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";

import type { SubjectRecord } from "types/schema";

const Options: Options = ({ id, onChange, value }) => {
  const options = useMemo<Option[]>(
    () => [
      {
        id: ModelNames.B_SUBJECT,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, vitae!",
        label: "Base",
      },
      {
        id: ModelNames.G_SUBJECT,
        label: "Grouped",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, nulla.",
      },
    ],
    []
  );
  const IDs = useMemo(
    () => options.map(() => id + Math.random().toString(36).slice(2)),
    [id, options]
  );

  return (
    <ul>
      {options.map((option, i) => (
        <li key={option.id} className="">
          <label htmlFor={IDs[i]} className="grid grid-cols-5 grid-rows-4">
            <input
              name={id}
              id={IDs[i]}
              type="radio"
              checked={option.id === value}
              onChange={(e) => e.target.checked && onChange(option.id)}
            />
            <h4 className="col-start-1 col-end-5 row-start-1 row-end-2 text-sm font-bold uppercase tracking-wide">
              {option.label}
            </h4>
            <p className="col-start-1 col-end-6 row-start-2 row-end-5 text-sm text-slate-400">
              {option.description}
            </p>
          </label>
        </li>
      ))}
    </ul>
  );
};

export type Option = {
  label: string;
  description: string;
  id: SubjectRecord["__type"];
};

type OptionsProps = {
  id: string;
  value?: Option["id"];
  onChange(v: Option["id"]): void;
};

type Options = FunctionComponent<OptionsProps>;

export default Options;
