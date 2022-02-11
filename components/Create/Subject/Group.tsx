import { FunctionComponent } from "react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";

import { classNames } from "utils";
import { Input } from "components/Form";

import Teachers from "./Teachers";

import type { OneKey } from "types/utils";
import type { Value as EmailValue } from "components/Form/Email";

const GroupSubject: GroupSubject = ({ onChange, values = [] }) => {
  const handleChange = ({ i, ...obj }: OneKey<DivisionValue> & { i: number }) =>
    onChange(values.map((a, b) => Object.assign(a, b === i && obj)));

  return (
    <div className="w-full space-y-5">
      <span className="font-medium text-slate-800">Divisions</span>
      <ol className="w-full">
        {values.map((value, id) => (
          <li key={id}>
            <Division
              {...value}
              id={id + 1}
              handleChange={(v) => handleChange({ i: id, ...v })}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

const Division: Division = ({ alias, id, name, handleChange, teachers }) => {
  return (
    <details className="group">
      <summary className="flex cursor-pointer flex-row items-center justify-start gap-x-3 [list-style:none]">
        <span className="overflow-hidden rounded-full bg-slate-800 p-1">
          <PlusSmIcon className="block h-5 w-5 fill-white group-open:hidden" />
          <MinusSmIcon className="hidden h-5 w-5 fill-white group-open:block" />
        </span>
        <span className="truncate text-sm text-slate-800">
          {name || `Division ${id}`}
        </span>
      </summary>
      <div className="space-y-2 pt-5 pl-5">
        <div className="flex w-full flex-row md:gap-x-3 lg:gap-x-5">
          <Input
            required
            value={name}
            label="Division name"
            onChange={(name) => handleChange({ name })}
            id={`division${id}Name`}
            className={(valid) =>
              classNames(
                "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                {
                  "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                    valid === true,
                  "invalid:ring-red-400 focus:invalid:ring-red-400":
                    valid === false,
                }
              )
            }
          />
          <Input
            required
            value={alias}
            label="Division alias"
            id={`division${id}Name`}
            onChange={(alias) => handleChange({ alias })}
            className={(valid) =>
              classNames(
                "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                {
                  "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                    valid === true,
                  "invalid:ring-red-400 focus:invalid:ring-red-400":
                    valid === false,
                }
              )
            }
          />
        </div>
        <Teachers
          values={teachers}
          onChange={(teachers) => handleChange({ teachers })}
        />
      </div>
    </details>
  );
};

export type DivisionValue = {
  name: string;
  alias: string;
  teachers: EmailValue[];
};

type Division = FunctionComponent<
  DivisionValue & {
    id: number;
    handleChange(v: OneKey<DivisionValue>): void;
  }
>;

type GroupSubject = FunctionComponent<{
  values?: DivisionValue[];
  onChange(v: DivisionValue[]): void;
}>;

export default GroupSubject;
