import { FunctionComponent } from "react";

import { Body } from "./Body";
import { Sidebar } from "./Sidebar";

export const Layout: FunctionComponent<LayoutProps> = ({ children, hideSidebar }) => {
  return (
    <main className="flex h-screen w-screen items-stretch overflow-hidden font-urbane">
      {!hideSidebar && <Sidebar />}
      <Body>{children}</Body>
    </main>
  );
};

interface LayoutProps {
  /** Hide sidebar in `/login` route */
  hideSidebar: boolean;
}
