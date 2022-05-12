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
    </Fragment>
  );
};

export default Login;
