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
      setOptions(classes.data.map((d) => ({ id: d._id, value: d.name })));
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

type Class = FunctionComponent<{
  value: string;
  onChange(v: string): void;
}>;
