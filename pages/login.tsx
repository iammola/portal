import Head from "next/head";

import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <main className="flex h-screen w-screen items-stretch justify-center overflow-hidden bg-black font-urbane">
      <Head>
        <title>Login | GRS CBT</title>
      </Head>
      <figure className="w-[48.5vw] bg-gray-900" />
      <section className="flex grow flex-col items-center justify-center gap-y-[4.5rem] bg-white p-5">
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-6 px-10">
          <h1 className="text-5xl font-light text-slate-500">Sign in to Portal</h1>
        </div>
      </section>
    </main>
  );
};

export default Login;
