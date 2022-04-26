import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";

import { classNames } from "utils";
import { Input } from "./components/Form";

import Teachers from "./Teachers";

import type { Value as EmailValue } from "./components/Form/Email";

const GroupSubject: GroupSubject = ({ addDivision, onChange, removeDivision, values = [] }) => {
  const handleChange = ({ i, ...obj }: Utils.OneKey<DivisionValue> & { i: number }) =>
    onChange(values.map((a, b) => Object.assign(a, b === i && obj)));

  return (
    <div className="w-full space-y-5">
      <span className="text-slate-800 font-medium">Divisions</span>
      <ol className="w-full space-y-3">
        {values.map((value, id) => (
          <li key={id}>
            <Division
              {...value}
              id={id + 1}
              handleChange={(v) => handleChange({ i: id, ...v })}
              remove={values.length > 2 ? () => removeDivision(id) : undefined}
            />
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={addDivision}
        className="bg-slate-700 hover:bg-slate-600 focus:ring-slate-500 rounded-full border px-5 py-2.5 text-sm font-medium text-white ring-2 ring-transparent ring-offset-1 ring-offset-white focus:outline-none"
      >
        Add division
      </button>
    </div>
  );
};

const Division: Division = ({ alias, id, name, handleChange, remove, teachers }) => {
  return (
    <details className="group">
      <summary className="hover:bg-slate-200 group-open:bg-slate-200 flex cursor-pointer flex-row items-center justify-start gap-x-3 rounded-md py-2 px-2 [list-style:none] focus:outline-none">
        <span className="bg-slate-800 overflow-hidden rounded-full p-1">
          <PlusSmIcon className="block h-5 w-5 fill-white group-open:hidden" />
          <MinusSmIcon className="hidden h-5 w-5 fill-white group-open:block" />
        </span>
        <span className="text-slate-800 truncate text-sm">{name || `Division ${id}`}</span>
        {remove !== undefined && (
          <span
            onClick={remove}
            className="text-slate-700 ml-auto cursor-pointer text-xs tracking-wide underline"
          >
            Remove
          </span>
        )}
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
                "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:valid:border-transparent focus:invalid:border-transparent",
                {
                  "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                  "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
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
                "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:valid:border-transparent focus:invalid:border-transparent",
                {
                  "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                  "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
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

type Division = React.FC<
  DivisionValue & {
    id: number;
    remove?: () => void;
    handleChange(v: Utils.OneKey<DivisionValue>): void;
  }
>;

type GroupSubject = React.FC<{
  addDivision(): void;
  values?: DivisionValue[];
  removeDivision(idx: number): void;
  onChange(v: DivisionValue[]): void;
}>;

export default GroupSubject;
