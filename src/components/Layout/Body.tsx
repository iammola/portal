import { useOnline } from "utils";

export const Body: React.FC<CP> = ({ children }) => {
  useOnline();

  return <section className="bg-slate-100 flex h-full grow flex-col justify-start overflow-y-auto">{children}</section>;
};
