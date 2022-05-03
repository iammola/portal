import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { CaretRightIcon, HomeIcon } from "@radix-ui/react-icons";

export const Breadcrumbs: React.FC = () => {
  const { asPath, isReady } = useRouter();
  const paths = useMemo(() => {
    const query = asPath.indexOf("?") > 0 ? asPath.indexOf("?") : asPath.length;
    const keys = asPath.slice(1, query).replaceAll("-", " ").split("/");

    return keys.reduce<string[]>((acc, _, idx) => {
      return [...acc, keys.slice(0, idx + 1).join("/")].filter(Boolean);
    }, []);
  }, [asPath]);

  if (!isReady) return null;
  return (
    <div className="flex items-center justify-start gap-2">
      <Home />
      {paths.map((path) => (
        <Path
          key={path}
          href={path}
        >
          {path.replace(/(?:.*?\/)+/, "")}
        </Path>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <Link href="/">
      <a className="flex items-center justify-start gap-2 text-sm text-gray-11">
        <HomeIcon />
        Home
      </a>
    </Link>
  );
};

const Path: React.FC<CP<{ href: string }, string>> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="flex items-center justify-start gap-2 text-sm text-gray-11">
        <CaretRightIcon />
        {children}
      </a>
    </Link>
  );
};
