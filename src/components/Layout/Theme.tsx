import { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ThemePicker: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [toggle] = useState<Record<string, string>>(
    ["dark", "light"].reduce((acc, theme, idx, arr) => ({ ...acc, [theme]: arr[idx === 0 ? 1 : 0] }), {})
  );

  return (
    <button
      type="button"
      onClick={() => setTheme(toggle[theme ?? "dark"])}
      className="fixed bottom-8 right-8 z-[9999] grid place-items-center rounded-full bg-gray-3 p-4 text-gray-12 ring-1 ring-gray-7 hover:bg-gray-4 hover:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:hover:bg-gray-dark-4 dark:hover:ring-gray-dark-8"
    >
      {theme === "dark" && <MoonIcon className="h-12 w-12" />}
      {theme === "light" && <SunIcon className="h-12 w-12" />}
    </button>
  );
};
