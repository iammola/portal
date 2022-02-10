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

SubjectType.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

type Option = {
  label: string;
  id: SubjectRecord["__type"];
};

type SubjectTypeProps = {
  className: string;
  value: Option["id"];
  onChange(v: Option["id"]): void;
};

interface SubjectType extends FunctionComponent<SubjectTypeProps> {
  Label: FunctionComponent<{ className: string }>;
}

export default SubjectType;
