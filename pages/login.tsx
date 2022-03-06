import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Input, Password } from "components/Form";

import type { NextPage } from "next";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex h-screen w-screen items-stretch justify-center overflow-hidden bg-black font-urbane">
      <Head>
        <title>Login | GRS CBT</title>
      </Head>
      <figure className="w-[48.5vw] bg-gray-900" />
      <section className="relative flex grow flex-col items-center justify-center gap-y-[4.5rem] bg-white p-5">
        <div className="relative h-8 w-10 self-end">
          <Image src="/Logo.png" layout="fill" objectFit="contain" />
        </div>
        <h1 className="text-5xl font-light text-gray-600">Sign in to Portal</h1>
        <form className="flex w-full max-w-lg flex-col items-center justify-center gap-y-6 px-10">
          <div className="w-full space-y-8">
            <div className="flex w-full flex-col items-start justify-center gap-y-1">
              <label
                htmlFor="username"
                className="text-sm font-light tracking-wider text-slate-600"
              >
                Username
              </label>
              <Input
                required
                id="username"
                value={username}
                onChange={setUsername}
                className="h-[3.5rem] w-full rounded-lg border-none bg-slate-50 pl-6 text-slate-700 placeholder-slate-200 focus:outline-none"
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
                id="password"
                value={password}
                onChange={setPassword}
                className="h-[3.5rem] w-full rounded-lg border-none bg-slate-50 pl-6 text-slate-700 placeholder-slate-200 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between py-2">
            <div className="flex items-center justify-start gap-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-[1.15rem] w-[1.15rem] rounded border-slate-300 text-blue-500 focus:border-transparent focus:ring focus:ring-blue-200 focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-sm font-light tracking-wide text-slate-700">
                Remember me?
              </label>
            </div>
            <Link href="/recover">
              <a className="text-sm tracking-wide text-blue-500 focus:underline focus:underline-offset-4 focus:outline-none">
                Forgot Password?
              </a>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 p-3 text-sm font-medium tracking-wide text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign in
          </button>
        </form>
        <span className="min-w-max text-center text-xs font-light tracking-wide text-slate-500">
          <span className="block">© {new Date().getFullYear()} Grand Regal School.</span>{" "}
          <span className="block">All Rights Reserved</span>
        </span>
        <div className="mt-auto"></div>
      </section>
    </main>
  );
};

export default Login;
