import Head from "next/head";
import Link from "next/link";

import { Input, Password } from "components/Form";

import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <main className="flex h-screen w-screen items-stretch justify-center overflow-hidden bg-black font-urbane">
      <Head>
        <title>Login | GRS CBT</title>
      </Head>
      <figure className="w-[48.5vw] bg-gray-900" />
      <section className="flex grow flex-col items-center justify-center gap-y-[4.5rem] bg-white p-5">
        <h1 className="text-5xl font-light text-slate-500">Sign in to Portal</h1>
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-6 px-10">
          <form className="w-full space-y-8">
            <div className="flex w-full flex-col items-start justify-center gap-y-1">
              <label
                htmlFor="username"
                className="text-sm font-light tracking-wider text-slate-600"
              >
                Username
              </label>
              <Input
                value=""
                required
                id="username"
                onChange={() => void {}}
                className="h-[3.5rem] w-full rounded-lg bg-slate-50 pl-6 text-slate-700 placeholder-slate-200 focus:outline-none"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-y-1">
              <label
                htmlFor="password"
                className="text-sm font-light tracking-wider text-slate-600"
              >
                Password
              </label>
              <Password
                required
                value=""
                id="password"
                onChange={() => void {}}
                className="h-[3.5rem] w-full rounded-lg bg-slate-50 pl-6 text-slate-700 placeholder-slate-200 focus:outline-none"
              />
            </div>
          </form>
          <div className="flex w-full items-center justify-between py-2">
            <div className="flex items-center justify-start gap-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-[1.15rem] w-[1.15rem] rounded border-slate-300 text-blue-500"
              />
              <label htmlFor="remember" className="text-sm font-light tracking-wide text-slate-700">
                Remember me?
              </label>
            </div>
            <Link href="/recover">
              <a className="text-sm tracking-wide text-blue-500">Forgot Password?</a>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 p-3 text-sm font-medium tracking-wide text-white hover:bg-blue-600"
          >
            Sign in
          </button>
        </div>
        <span className="min-w-max text-center text-xs font-light tracking-wide text-slate-500">
          <span className="block">© {new Date().getFullYear()} Grand Regal School.</span>{" "}
          <span className="block">All Rights Reserved</span>
        </span>
      </section>
    </main>
  );
};

export default Login;
