import Link from "next/link";
import { CaretRightIcon, HomeIcon } from "@radix-ui/react-icons";

export const Breadcrumbs: React.FC = () => {
  return <></>;
};

const Home: React.FC = () => {
  return (
    <Link href="/">
      <a className="flex gap-2 text-gray-11 items-center justify-start text-sm">
        <HomeIcon />
        Home
      </a>
    </Link>
  );
};

const Path: React.FC<CP<{ href: string }, string>> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="flex gap-2 text-gray-11 items-center justify-start text-sm">
        <CaretRightIcon />
        {children}
      </a>
    </Link>
  );
};
