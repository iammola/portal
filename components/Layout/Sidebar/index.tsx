import { FunctionComponent } from "react";

import { Menu } from "./Menu";
import { Footer } from "./Footer";

export const Sidebar: FunctionComponent = () => {
  return (
    <aside className="flex h-full w-[22.5rem] shrink-0 flex-col items-start justify-start divide-y divide-slate-300 overflow-y-auto">
      <Menu />
      <Footer />
    </aside>
  );
};
