import Head from "next/head";
import { Fragment } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

import type { NextPage } from "next";

const Events: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Events &middot; Portal</title>
      </Head>
      <div className="flex h-full flex-col items-start justify-center gap-5 p-10 pt-[60px]">
        <h3 className="text-4xl font-bold text-gray-12 dark:text-gray-dark-12">School Events</h3>
        <div className="grid w-full grow grid-cols-[max-content_minmax(0,1fr)] grid-rows-[max-content_minmax(0,1fr)] gap-2.5">
          <div className="col-span-full flex w-full min-w-0 items-center justify-between gap-2.5 rounded-lg bg-gray-3 px-5 py-2 dark:bg-gray-dark-3">
            <h6 className="text-lg font-semibold tracking-wide text-gray-12 dark:text-gray-dark-12">June 2022</h6>
            <div className="flex items-center justify-center gap-0.5 p-1.5">
              <button
                type="button"
                className="rounded-full p-2 text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
              >
                <CaretLeftIcon />
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-1 text-sm text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
              >
                Today
              </button>
              <button
                type="button"
                className="rounded-full p-2 text-gray-12 hover:bg-gray-5 focus:outline-none focus:ring-2 focus:ring-gray-6 active:bg-gray-6 dark:text-gray-dark-12 dark:hover:bg-gray-dark-5 dark:focus:ring-gray-dark-6 dark:active:bg-gray-dark-6"
              >
                <CaretRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
