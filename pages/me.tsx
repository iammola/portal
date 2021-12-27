import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";

import { classNames } from "utils";

import type { NextPage } from "next";

const Me: NextPage = () => {
    const tabs = useMemo(
        () => ["My details", "Profile", "Password", "Team", "Plan", "Billing"] as const,
        []
    );
    const [activeTab, setActiveTab] = useState<typeof tabs[number]>("My details");

    return (
        <main className="flex items-stretch justify-center w-screen h-full min-h-screen">
            <Head>
                <title>My Profile | GRIS Portal</title>
                <meta name="description" content="My Profile" />
            </Head>
            <section className="flex flex-col items-center justify-start flex-grow">
                <div className="w-full h-56 relative bg-gradient-to-r from-purple-300 to-slate-100" />
                <div className="w-full flex-grow px-10">
                    <div className="relative flex items-center justify-start w-full h-24">
                        <div className="absolute top-10 -translate-y-1/2 w-44 aspect-square ring-4 ring-white overflow-x-hidden rounded-full shadow-2xl shadow-slate-300 bg-rose-200">
                            <div className="relative w-full h-full rounded-full">
                                <Image
                                    layout="fill"
                                    priority={true}
                                    alt="Portrait 3"
                                    objectFit="cover"
                                    src="/Portrait 3.jpg"
                                    objectPosition="top"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-start justify-center ml-44 pl-5">
                            <h3 className="text-4xl text-gray-700">Christina Andrews</h3>
                            <span className="text-xs text-gray-500 tracking-wider">
                                c.andrews@grschool.com
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-8 w-full mt-20 border-b border-b-gray-200">
                        {tabs.map((tab) => (
                            <span
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={classNames(
                                    "relative inline-block w-max pb-5 text-sm font-medium tracking-wide cursor-pointer",
                                    [
                                        activeTab === tab,
                                        "text-gray-900",
                                        "text-gray-500 hover:text-gray-900",
                                    ]
                                )}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute -bottom-px inset-x-0 w-full h-[2px] bg-gray-900 rounded-full" />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Me;
