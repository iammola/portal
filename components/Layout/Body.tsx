import { FunctionComponent } from "react";

import { classNames } from "utils";

export const Body: FunctionComponent<BodyProps> = ({ children, className }) => {
  return <section className={classNames(className, "!h-full !grow !overflow-y-auto")}>{children}</section>;
};

interface BodyProps {
  className?: string;
}
