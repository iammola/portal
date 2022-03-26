import { FunctionComponent } from "react";

import { Menu } from "./Menu";
import { Footer } from "./Footer";

export const Sidebar: FunctionComponent = () => {
  return (
    <aside className="h-full w-[22.5rem] divide-y divide-slate-300 overflow-y-auto">
      <Menu />
      <Footer />
    </aside>
  );
};
