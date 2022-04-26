import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ThemePicker: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [toggle] = useState<Record<string, string>>(
    ["dark", "light"].reduce((acc, theme, idx, arr) => ({ ...acc, [theme]: arr[idx === 0 ? 1 : 0] }), {})
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Tooltip.Root delayDuration={100}>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onClick={() => setTheme(toggle[theme ?? "dark"])}
          className="fixed bottom-4 right-4 z-[9999] grid place-items-center rounded-full bg-gray-3 p-3 text-gray-12 ring-1 ring-gray-7 hover:bg-gray-4 hover:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:hover:bg-gray-dark-4 dark:hover:ring-gray-dark-8"
        >
          {theme === "dark" && <MoonIcon className="h-6 w-6" />}
          {theme === "light" && <SunIcon className="h-6 w-6" />}
          {theme === "system" && <DesktopIcon className="h-6 w-6" />}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content
        asChild
        side="top"
        align="center"
        sideOffset={5}
      >
        <span className="rounded-md bg-white px-4 py-2.5 text-sm tracking-wide text-gray-12">
          <span className="capitalize">{theme}</span> theme active
        </span>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};
