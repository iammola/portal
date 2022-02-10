import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";

import type { SubjectRecord } from "types/schema";

const SubjectType: SubjectType = () => {
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

type Option = {
  label: string;
  id: SubjectRecord["__type"];
};

type SubjectType = FunctionComponent<{ label: string }>;

export default SubjectType;
