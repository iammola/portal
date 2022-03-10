import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, FunctionComponent, useMemo } from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";

export const Breadcrumbs: FunctionComponent<Props> = ({ className }) => {
  const { asPath } = useRouter();
  const paths = useMemo(() => asPath.slice(1, asPath.indexOf("?")).split("/"), [asPath]);

  return (
    <nav className={className ?? "flex w-full gap-x-2 py-2"}>
      <Link href="/">
        <a>
          <HomeIcon className="h-5 w-5 fill-slate-500" />
        </a>
      </Link>
      {paths.map((page, index, array) => (
        <Fragment key={page}>
          <ChevronRightIcon className="h-5 w-5 fill-slate-500" />
          <Link href={"/" + array.slice(0, index + 1).join("/")}>
            <a className="font-urbane text-sm capitalize text-slate-500">
              {page.replaceAll("-", " ")}
            </a>
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};

interface Props {
  className?: string;
}
