import Head from "next/head";
import { Fragment } from "react";
import dynamic from "next/dynamic";

import type { NextPage } from "next";

const Calendar = dynamic(() => import("components/Pages/Calendar/Events"));
const Events: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Events &middot; Portal</title>
      </Head>
      <div className="flex h-full flex-col items-start justify-center gap-5 p-8">
        <h3 className="text-4xl font-bold text-gray-12 dark:text-gray-dark-12">School Events</h3>
        <Calendar />
      </div>
    </Fragment>
  );
};

export default Events;
