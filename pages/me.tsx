import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

import type { NextPage } from "next";

const StudentMe = dynamic(() => import("components/Student/Me"));

const Me: NextPage = () => {
  return (
    <main className="flex items-stretch justify-center w-screen h-full min-h-screen">
      <Head>
        <title>My Profile | GRIS Portal</title>
        <meta name="description" content="My Profile" />
      </Head>
      <section className="flex flex-col items-center justify-start grow w-full">
        <div className="w-full h-52 relative bg-gradient-to-r from-purple-300 to-slate-100" />
        <div className="w-full grow px-5 md:px-10 bg-slate-50">
          <div className="relative flex items-center justify-start w-full h-24">
            <div className="absolute z-10 top-10 -translate-y-1/2 w-44 aspect-square ring-4 ring-white overflow-x-hidden rounded-full shadow-2xl shadow-slate-300">
              <div className="relative w-full h-full rounded-full">
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
            <div className="flex flex-col gap-y-1 items-start justify-center ml-44 pl-5">
              <h3 className="text-4xl text-slate-700">Christina Andrews</h3>
              <span className="text-xs text-slate-500 tracking-wider">
                c.andrews@grschool.com
              </span>
            </div>
          </div>
          <StudentMe />
        </div>
      </section>
    </main>
  );
};

export default Me;
