import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

import type { NextPage } from "next";

const StudentMe = dynamic(() => import("components/Student/Me"));

const Me: NextPage = () => {
  return (
    <main className="flex h-full min-h-screen w-screen items-stretch justify-center">
      <Head>
        <title>My Profile | GRIS Portal</title>
        <meta name="description" content="My Profile" />
      </Head>
      <section className="flex w-full grow flex-col items-center justify-start">
        <div className="relative h-52 w-full bg-gradient-to-r from-purple-300 to-slate-100" />
        <div className="w-full grow bg-slate-50 px-5 md:px-10">
          <div className="relative flex h-24 w-full items-center justify-start">
            <div className="absolute top-10 z-10 aspect-square w-44 -translate-y-1/2 overflow-x-hidden rounded-full shadow-2xl shadow-slate-300 ring-4 ring-white">
              <div className="relative h-full w-full rounded-full">
                <Image
                  priority
                  layout="fill"
                  alt="Portrait 3"
                  objectFit="cover"
                  src="/Portrait 3.jpg"
                  objectPosition="top"
                />
              </div>
            </div>
            <div className="ml-44 flex flex-col items-start justify-center gap-y-1 pl-5">
              <h3 className="text-4xl text-slate-700">Christina Andrews</h3>
              <span className="text-xs tracking-wider text-slate-500">c.andrews@grschool.com</span>
            </div>
          </div>
          <StudentMe />
        </div>
      </section>
    </main>
  );
};

export default Me;
