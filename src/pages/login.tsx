import { NextPage } from "next";
import { Fragment } from "react";
import { format } from "date-fns";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Login &middot; Portal</title>
      </Head>
      <header className="flex items-center justify-between border-b border-gray-6 p-5 dark:border-gray-dark-6">
        <h2 className="text-xl font-semibold text-gray-12 dark:text-gray-dark-12">School Portal</h2>
        <time
          dateTime={format(new Date(), "yyyy-MM-dd")}
          className="text-sm font-light text-gray-11 dark:text-gray-dark-11"
        >
          {format(new Date(), "E, do LLLL yyyy")}
        </time>
      </header>
      <section className="flex grow flex-col items-center justify-center gap-5 py-10 px-6 md:flex-row md:gap-10 md:px-12 lg:px-24">
        <div className="max-w-lg">
          <p className="text-5xl font-bold leading-relaxed text-gray-12 dark:text-gray-dark-12">
            Log in to your account
          </p>
        </div>
        <div className="flex h-full flex-col items-center gap-4" />
      </section>
    </Fragment>
  );
};

export default Login;
