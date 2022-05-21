import { Fragment } from "react";
import Head from "next/head";

import type { NextPage } from "next";

const MyResults: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>My Results &middot; Portal</title>
      </Head>
      <h2 className="py-3 text-3xl font-bold tracking-wide text-gray-12 dark:text-gray-dark-12">My Results</h2>
    </Fragment>
  );
};

export default MyResults;
