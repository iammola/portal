import { FunctionComponent } from "react";

import { Menu } from "./Menu";

export const Sidebar: FunctionComponent = () => {
  return (
    <aside className="h-full w-[22.5rem] divide-y divide-slate-300 overflow-y-auto">
      <Menu />
    </aside>
  );
};
