import { FunctionComponent, useMemo } from "react";

import { ModelNames } from "db";

import type { SubjectRecord } from "types/schema";

const SubjectType: SubjectType = ({ children, className }) => {
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

  return <div className={className}>{children}</div>;
};

type Option = {
  label: string;
  id: SubjectRecord["__type"];
};

type SubjectType = FunctionComponent<{
  label: string;
  className: string;
  value: Option["id"];
  onChange(v: Option["id"]): void;
}>;

export default SubjectType;
