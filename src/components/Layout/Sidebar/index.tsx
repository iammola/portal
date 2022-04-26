import { Menu } from "./Menu";
import { Footer } from "./Footer";

export const Sidebar: React.FC = () => {
  return (
    <aside className="divide-slate-300 flex h-full w-[22.5rem] shrink-0 flex-col items-start justify-start divide-y overflow-y-auto">
      <Menu />
      <Footer />
    </aside>
  );
};
