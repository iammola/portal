import { Fragment } from "react";
import Head from "next/head";

import type { NextPage } from "next";

const CreateSubject: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Create a Subject &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Subject</h3>
        <form className="w-full max-w-md space-y-10"></form>
      </div>
    </Fragment>
  );
};

export default CreateSubject;
