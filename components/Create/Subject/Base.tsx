import { FunctionComponent } from "react";

import Teachers, { TeachersProps } from "./Teachers";

const BaseSubject: BaseSubject = ({ teachers }) => {
  return (
    <div className="h-32">
      <Teachers {...teachers} />
    </div>
  );
};

type BaseSubject = FunctionComponent<{ teachers: TeachersProps }>;

export default BaseSubject;
