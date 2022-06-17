import { Fragment, useEffect, useState } from "react";
import Head from "next/head";

import { cx } from "utils";
import { connect } from "db";

import type { GetServerSideProps, NextPage } from "next";

const Home: NextPage<HomeProps> = ({ isConnected, time }) => {
  const [mounted, setMounted] = useState(false);
  const [emoji] = useState(() => {
    const sets = [
      ["😭", "🙈", "☹️", "👎", "😪", "😥", "😨", "😒", "😞", "😿", "🙅‍♂️"],
      ["👍", "😁", "😊", "👏", "👌", "🚀", "🤞", "😸", "🍀", "🎉", "🙌"],
    ][+isConnected];

    return sets[Math.floor(Math.random() * sets.length)];
  });

  function formatTime(time: number): string {
    const minutesInMilliseconds = 60 * 1e3;

    if (time < 1e3) return `${time}ms`;
    if (time < 60 * 1e3) return `${+(time / 1e3).toFixed(3)}s`;

    const [minutes, rem] = [Math.floor(time / minutesInMilliseconds), time % minutesInMilliseconds];
    return `${minutes}m${rem > 0 ? formatTime(rem) : ""}`;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Fragment>
      <Head>Home &middot; Portal</Head>
      <div className="flex h-full w-full flex-col items-center justify-center gap-1">
        {time > 0 && (
          <span className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11 sm:text-base">
            Done in {formatTime(time)}
          </span>
        )}
        <h1 className="relative text-2xl font-bold tracking-wide text-gray-12 dark:text-gray-dark-12 sm:text-5xl">
          {isConnected ? "Connected to the Database" : "Not Connected to the Database"} {emoji}
          <div
            className={cx("absolute left-0 top-0 h-4 w-4 rounded-full", [
              isConnected,
              "text-green-12 dark:text-green-dark-12",
              "text-red-12 dark:text-red-dark-12",
            ])}
          />
        </h1>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const start = Date.now();
  let [isConnected, time] = [false, 0];

  try {
    await connect();
    [isConnected, time] = [true, Date.now() - start];
  } catch (error) {
    console.error(error);
  }

  return { props: { isConnected, time } };
};

type HomeProps = {
  isConnected: boolean;
  time: number;
};

export default Home;
