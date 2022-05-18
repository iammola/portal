import { Fragment } from "react";
import Head from "next/head";

import type { NextPage } from "next";

const CreateStudent: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Create a Teacher Account &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Teacher Account</h3>
        <form className="flex w-full grow flex-col items-center justify-start gap-7"></form>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
