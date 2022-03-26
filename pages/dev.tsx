import Head from "next/head";
import { Fragment } from "react";

import type { NextPage } from "next";

const Dev: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Development Page</title>
        <meta
          name="description"
          content="Test Components"
        />
      </Head>
    </Fragment>
  );
};

export default Dev;
