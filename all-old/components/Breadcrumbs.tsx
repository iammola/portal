import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";

import { classNames } from "utils";

export const Breadcrumbs: React.FC<Props> = ({ className }) => {
  const { asPath, isReady } = useRouter();
  const length = isReady && asPath.indexOf("?") > 0 ? asPath.indexOf("?") : undefined;
  const paths = useMemo(() => asPath.slice(1, length).split("/"), [asPath, length]);

  return (
    <nav className={classNames(className, "flex w-full items-center gap-x-2 py-2")}>
      <Link href="/">
        <a>
          <HomeIcon className="fill-slate-400 h-5 w-5" />
        </a>
      </Link>
      {paths.map((page, index, array) => (
        <Fragment key={page}>
          <ChevronRightIcon className="fill-slate-400 h-5 w-5" />
          <Link href={"/" + array.slice(0, index + 1).join("/")}>
            <a className="text-slate-400 font-urbane text-xs capitalize tracking-wide">{page.replaceAll("-", " ")}</a>
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};

interface Props {
  className?: string;
}