import Head from "next/head";
import dynamic from "next/dynamic";

import { UserImage } from "./components";

import type { NextPage } from "next";

const StudentMe = dynamic(() => import("./components/Student/Me"));

const Me: NextPage = () => {
  return (
    <main className="flex h-full min-h-screen w-screen items-stretch justify-center">
      <Head>
        <title>My Profile | GRIS Portal</title>
        <meta
          name="description"
          content="My Profile"
        />
      </Head>
      <section className="flex w-full grow flex-col items-center justify-start">
        <div className="from-purple-300 to-slate-100 relative h-52 w-full bg-gradient-to-r" />
        <div className="bg-slate-50 w-full grow px-5 md:px-10">
          <div className="relative flex h-24 w-full items-center justify-start">
            <div className="shadow-slate-300 absolute top-10 z-10 aspect-square w-44 -translate-y-1/2 overflow-x-hidden rounded-full shadow-2xl ring-4 ring-white">
              <UserImage
                priority
                alt="User Image"
                fallbackText="MJ"
                src="/Users/003.jpg"
                objectPosition="top"
              />
            </div>
            <div className="ml-44 flex flex-col items-start justify-center gap-y-1 pl-5">
              <h3 className="text-slate-700 text-4xl">Christina Andrews</h3>
              <span className="text-slate-500 text-xs tracking-wider">c.andrews@grs.io</span>
            </div>
          </div>
          <StudentMe />
        </div>
      </section>
    </main>
  );
};

export default Me;
