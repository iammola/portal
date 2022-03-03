import useSWR from "swr/immutable";
import { FunctionComponent, useEffect, useState } from "react";

import Select, { Value } from "../Select";

import type { ApiResult } from "types/api";
import type { GetClassesData } from "types/api/classes";

export const Class: Class = ({ onChange, value }) => {
  const [options, setOptions] = useState<Value[]>([]);
  const { data: classes } = useSWR<ApiResult<GetClassesData<"name">>>(
    "/api/classes/?field=name"
  );

  useEffect(() => {
    if (classes?.success)
      setOptions(classes.data.map((d) => ({ id: d._id, value: d.name.long })));
  }, [classes]);

  return (
    <Select
      label="Class"
      options={options}
      onChange={(d) => onChange(d.id as string)}
      value={options.find((opt) => opt.id === value)}
    />
  );
};

export const Subjects: Subjects = ({ onChange, selectedClass, values }) => {
  const [options, setOptions] = useState<Value[]>([]);
  // NOTE: Type and API Route not yet implemented
  const { data: subjects } = useSWR<ApiResult<GetClassesData<"name">>>(
    `/api/classes/${selectedClass}/subjects/?field=name`
  );

  useEffect(() => {
    if (subjects?.success)
      setOptions(subjects.data.map((d) => ({ id: d._id, value: d.name.long })));
  }, [subjects]);

  return (
    <ul>
      {options.map(({ id, value }) => (
        <li
          key={id as string}
          className="flex flex-row items-center justify-start gap-x-2"
        >
          <label htmlFor={`subjectID${id as string}`}>
            <input
              type="checkbox"
              id={`subjectID${id as string}`}
              checked={values.includes(id as string)}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...values, id as string]
                    : values.filter((i) => i !== id)
                )
              }
            />
            {value}
          </label>
        </li>
      ))}
    </ul>
  );
};

type Class = FunctionComponent<{
  value: string;
  onChange(v: string): void;
}>;

type Subjects = FunctionComponent<{
  values: string[];
  selectedClass: string;
  onChange(v: string[]): void;
}>;
