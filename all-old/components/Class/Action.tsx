export const Action: React.FC<CP<ActionProps>> = ({ children, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-slate-200 group relative aspect-square cursor-pointer rounded-full p-2"
    >
      {children}
      <span className="text-slate-600 absolute -top-10 -left-4 hidden min-w-max rounded-md bg-white p-2.5 text-xs font-light tracking-wide shadow group-hover:block">
        {title}
      </span>
    </div>
  );
};
interface ActionProps {
  title: string;
  onClick?: () => void;
}
