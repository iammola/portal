import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { format, formatDistance } from "date-fns";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import { classNames } from "utils";
import { Breadcrumbs } from "components/Breadcrumbs";

import type { NextPage } from "next";

const students = [
  {
    name: "John Doe",
    age: 14,
    email: "john.doe@fake.io",
    online: { state: 0, since: new Date(Date.now() - 1800000) },
  },
  {
    name: "Maria Davidson",
    age: 15,
    email: "maria.davidson@fake.io",
    online: { state: 1, since: new Date(Date.now() - 720000) },
  },
];
const Class: NextPage = () => {
  const [activeTab, setActiveTab] = useState("Feed");

  return (
    <main className="flex h-screen w-screen items-stretch justify-center overflow-hidden font-urbane">
      <Head>
        <title>Class-Name | **SessionIfNotCurrent** | GRS Portal</title>
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start">
        <header className="flex w-full flex-col bg-slate-100 px-8 pt-4 pb-6">
          <Breadcrumbs />
          <h3 className="text-4xl font-semibold capitalize text-slate-700">Key Stage 1</h3>
          <p className="flex gap-x-1 pt-2 text-xs font-light tracking-wide text-slate-500">
            <span>Since {format(new Date(2018, 5, 22), "do MMMM yyyy")}</span>
            {"•"}
            <span>5 students</span>
            {"•"}
            <span>3 subjects</span>
          </p>
        </header>
        <section className="w-full px-20 pt-10 pb-6">
          <div className="relative flex w-full items-center justify-start gap-x-12 border-b-2 border-slate-300">
            {["Feed", "Students", "Subjects"].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  "relative cursor-pointer px-2 pb-3 tracking-wide text-slate-500 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full",
                  { "after:bg-gray-500": tab === activeTab }
                )}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="divide-y divide-slate-300">
            {students.map(({ online, ...item }, idx) => (
              <div
                key={idx}
                className="grid w-full grid-cols-[1fr_max-content_25%_max-content] gap-x-28 py-5"
              >
                <div className="flex w-full items-center justify-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 [shape-outside:circle(50%_at_50%_50%)]">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded-full"
                      alt="John Doe's Portrait Image"
                      src={`/Portrait ${idx + 3}.jpg`}
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <span className="tracking-wide text-blue-800">{item.name}</span>
                    <div className="flex gap-x-2">
                      <MailIcon className="h-5 w-5 fill-slate-500" />
                      <a
                        href={`mailto:${item.email}`}
                        className="flex gap-x-2 text-sm lowercase tracking-wide text-gray-500"
                      >
                        {item.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm tracking-wide text-slate-500">
                  {item.age} year{item.age > 1 && "s"}
                </div>
                <div className="flex flex-col items-start justify-center gap-y-1">
                  <div className="flex items-center gap-x-1 text-sm text-slate-700">
                    {online.state ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5 fill-emerald-500" />
                        Online
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5 fill-red-400" />
                        Offline
                      </>
                    )}
                  </div>
                  <div className="text-sm text-slate-500">
                    {online.state ? "Since" : "Last seen"}{" "}
                    {formatDistance(new Date(online.since), new Date(), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </div>
                </div>
                <Link href={`/students/${idx}`}>
                  <a className="flex items-center text-sm tracking-wide text-blue-600">View</a>
                </Link>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs">
              <div className="flex cursor-pointer items-center gap-x-3 py-4 text-slate-600">
                <ChevronLeftIcon className="h-5 w-5 fill-slate-500" />
                Previous
              </div>
              <div className="flex items-center justify-center gap-x-6">
                <span className="relative cursor-pointer py-4 px-2 text-blue-600 after:absolute after:-top-1 after:left-0 after:h-0.5 after:w-full after:bg-blue-600">
                  1
                </span>
                {new Array(5).fill(null).map((_, i) => (
                  <span key={i} className="cursor-pointer py-4 px-2 font-light text-slate-600">
                    {i + 2}
                  </span>
                ))}
              </div>
              <div className="flex cursor-pointer items-center gap-x-3 py-4 text-slate-600">
                Next
                <ChevronRightIcon className="h-5 w-5 fill-slate-500" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Class;
