import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { classNames } from "utils";

import type { NextPage } from "next";

const Me: NextPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>();
    const tabs = useMemo<Tab[]>(
        () => ["My details", "Profile", "Password", "Team", "Plan", "Billing", "Notifications"],
        []
    );
    const tabBadges = useMemo<{ [key in Tab]?: number }>(
        () => ({ Notifications: Math.floor(1 + Math.random() * 50) }),
        []
    );

    useEffect(() => {
        if (router.isReady === true) {
            const initialTab = (router.query.tab as Tab) ?? "My details";
            const [pathname, query, ...args] = [
                "/me",
                { tab: activeTab },
                undefined,
                { shallow: true },
            ] as const;

            if (activeTab === undefined && tabs.includes(initialTab)) setActiveTab(initialTab);
            else if (activeTab === "My details" && router.query.tab !== undefined)
                void router.push({ pathname }, ...args);
            else if (!["My details", router.query.tab].includes(activeTab))
                void router.push({ query, pathname }, ...args);
        }
    }, [activeTab, router, tabs]);

    return (
        <main className="flex items-stretch justify-center w-screen h-full min-h-screen">
            <Head>
                <title>My Profile | GRIS Portal</title>
                <meta name="description" content="My Profile" />
            </Head>
            <section className="flex flex-col items-center justify-start flex-grow w-full">
                <div className="w-full h-56 relative bg-gradient-to-r from-purple-300 to-slate-100" />
                <div className="w-full flex-grow px-10 bg-gray-50">
                    <div className="relative flex items-center justify-start w-full h-24">
                        <div className="absolute z-10 top-10 -translate-y-1/2 w-44 aspect-square ring-4 ring-white overflow-x-hidden rounded-full shadow-2xl shadow-slate-300 bg-rose-200">
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
                    <div className="sticky top-0 flex items-center justify-start gap-8 w-full pt-4 mt-16 mb-6 border-b border-b-gray-200 bg-gray-50">
                        {tabs.map((tab) => (
                            <span
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={classNames(
                                    "group relative inline-block w-max min-w-max pb-5 text-sm font-medium tracking-wide cursor-pointer",
                                    [
                                        activeTab === tab,
                                        "text-gray-900",
                                        "text-gray-500 hover:text-gray-900",
                                    ]
                                )}
                            >
                                {tab}
                                {tabBadges[tab] !== undefined && (
                                    <span
                                        className={classNames(
                                            "text-xs font-semibold ml-3 py-1 px-2.5 rounded-full",
                                            [
                                                activeTab === tab,
                                                "bg-gray-300 text-gray-900",
                                                "bg-gray-200 text-gray-700 group-hover:bg-gray-300 group-hover:text-gray-900",
                                            ]
                                        )}
                                    >
                                        {tabBadges[tab]}
                                    </span>
                                )}
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

type Tab = "My details" | "Profile" | "Password" | "Team" | "Plan" | "Billing" | "Notifications";

export default Me;
