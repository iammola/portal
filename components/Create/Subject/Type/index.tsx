import { FunctionComponent } from "react";

const SubjectType: SubjectType = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

SubjectType.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface SubjectType extends FunctionComponent<{ className: string }> {
  Label: FunctionComponent<{ className: string }>;
}

export default SubjectType;
