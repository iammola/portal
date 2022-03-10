import { useRouter } from "next/router";
import { Fragment, FunctionComponent } from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";

export const Breadcrumbs: FunctionComponent<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <nav className={className ?? "flex w-full gap-x-2 py-2"}>
      <HomeIcon className="h-5 w-5 fill-slate-500" />
      {router.route
        .slice(1)
        .split("/")
        .map((page) => (
          <Fragment key={page}>
            <ChevronRightIcon className="h-5 w-5 fill-slate-500" />
            <span className="font-urbane text-sm capitalize text-slate-500">
              {page.replaceAll("-", " ")}
            </span>
          </Fragment>
        ))}
    </nav>
  );
};

interface Props {
  className?: string;
}
