import { FunctionComponent } from "react";

export const List: FunctionComponent<Props> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

interface Props {
  className: string;
}
