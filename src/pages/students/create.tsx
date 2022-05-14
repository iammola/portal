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
        <form className="flex w-full grow flex-col items-center justify-start gap-7">
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Title</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7" />
          </section>
          <button
            type="submit"
            className="w-full max-w-xs rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 dark:text-gray-dark-12"
          >
            Create Student
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
