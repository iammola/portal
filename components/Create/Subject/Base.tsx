import { FunctionComponent } from "react";

import Teachers, { TeachersProps } from "./Teachers";

const BaseSubject: BaseSubject = ({ teachers }) => {
  return <Teachers {...teachers} />;
};

type BaseSubject = FunctionComponent<{ teachers: TeachersProps }>;

export default BaseSubject;
