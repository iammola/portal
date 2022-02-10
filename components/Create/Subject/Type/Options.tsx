import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";

import type { SubjectRecord } from "types/schema";

const Options: Options = () => {
  const options = useMemo<Option[]>(
    () => [
      {
        id: ModelNames.B_SUBJECT,
        label: "Base",
      },
      {
        id: ModelNames.G_SUBJECT,
        label: "Grouped",
      },
    ],
    []
  );

  return <></>;
};

export type Option = {
  label: string;
  id: SubjectRecord["__type"];
};

type OptionsProps = {
  value: Option["id"];
  onChange(v: Option["id"]): void;
};

type Options = FunctionComponent<OptionsProps>;

export default Options;
