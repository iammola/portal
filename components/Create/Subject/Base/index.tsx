import { FunctionComponent } from "react";

import Teachers from "./Teachers";

const BaseSubject: BaseSubject = () => {
  return (
    <>
      <Teachers />
    </>
  );
};

type BaseSubject = FunctionComponent;

export default BaseSubject;
