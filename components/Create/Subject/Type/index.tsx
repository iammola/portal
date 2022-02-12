import { FunctionComponent } from "react";

import Options from "./Options";

const SubjectType: SubjectType = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

SubjectType.Options = Options;
SubjectType.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface SubjectType extends FunctionComponent<{ className: string }> {
  Options: Options;
  Label: FunctionComponent<{ className: string }>;
}

export default SubjectType;
