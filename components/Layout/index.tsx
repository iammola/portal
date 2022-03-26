import { FunctionComponent } from "react";

import { Body } from "./Body";
import { Sidebar } from "./Sidebar";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <main className="flex h-screen w-screen items-stretch overflow-hidden font-urbane">
      <Sidebar />
      <Body>{children}</Body>
    </main>
  );
};
