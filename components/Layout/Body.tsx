import { FunctionComponent } from "react";

export const Body: FunctionComponent = ({ children }) => {
  return <section className="flex h-full grow flex-col justify-start overflow-y-auto bg-slate-100">{children}</section>;
};
