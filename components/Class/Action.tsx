import { FunctionComponent } from "react";

export const Action: FunctionComponent<ActionProps> = ({ children, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-square cursor-pointer rounded-full p-2 hover:bg-slate-200"
    >
      {children}
      <span className="absolute -top-10 -left-4 hidden min-w-max rounded-md bg-white p-2.5 text-xs font-light tracking-wide text-slate-600 shadow group-hover:block">
        {title}
      </span>
    </div>
  );
};
interface ActionProps {
  title: string;
  onClick?: () => void;
}
