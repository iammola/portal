import { FunctionComponent } from "react";

export const Body: FunctionComponent = ({ children }) => {
  return <section className="h-full grow overflow-y-auto">{children}</section>;
};
