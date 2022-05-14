import { Fragment } from "react";
import Head from "next/head";

import type { NextPage } from "next";

const CreateStudent: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Create a Student Account &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Student Account</h3>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
