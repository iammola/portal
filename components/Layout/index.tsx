import { FunctionComponent } from "react";

import { Body } from "./Body";
import { Sidebar } from "./Sidebar";

export const Layout: FunctionComponent<LayoutProps> = ({ bodyClassName, children }) => {
  return (
    <main className="flex h-screen w-screen items-stretch overflow-hidden font-urbane">
      <Sidebar />
      <Body className={bodyClassName}>{children}</Body>
    </main>
  );
};

interface LayoutProps {
  /** Do not use styles that'll change the height, overflow or flex-grow properties */
  bodyClassName?: string;
}
