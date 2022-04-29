import { cx, useOnline } from "utils";

export const Online: React.FC = () => {
  const { online } = useOnline();

  return (
    <div className="group absolute top-0 right-0 h-3 w-3 cursor-pointer">
      <div
        className={cx("h-3 w-3 rounded-full ring ring-white", [
          online,
          "bg-green-9 dark:bg-green-dark-9",
          "bg-red-9 dark:bg-red-dark-9",
        ])}
      />
      <div
        className={cx("absolute inset-0 h-3 w-3 animate-ping rounded-full opacity-75", [
          online,
          "bg-green-10 dark:bg-green-dark-10",
          "bg-red-10 dark:bg-red-dark-10",
        ])}
      />
      <div className="absolute left-3 -top-8 hidden min-w-max items-center justify-center gap-x-2 rounded-lg bg-white p-2.5 text-xs shadow group-hover:flex">
        <span>{online ? "👍" : "👎"}</span>{" "}
        <span className="text-gray-11 tracking-wider">{online ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};
