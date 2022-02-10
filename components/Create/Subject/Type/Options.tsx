import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";

import type { SubjectRecord } from "types/schema";

const Options: Options = () => {
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

  return <></>;
};

export type Option = {
  label: string;
  description: string;
  id: SubjectRecord["__type"];
};

type OptionsProps = {
  value?: Option["id"];
  onChange(v: Option["id"]): void;
};

type Options = FunctionComponent<OptionsProps>;

export default Options;
