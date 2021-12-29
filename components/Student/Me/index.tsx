import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useMemo, useState } from "react";

import { classNames } from "utils";

const MyDetails = dynamic(() => import("./MyDetails"));
const Password = dynamic(() => import("components/Global/Me/Password"));

const StudentMe: FunctionComponent = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>();
    const tabs = useMemo<Tab[]>(() => ["My details", "Profile", "Password", "Notifications"], []);
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
        <>
            <div className="sticky top-0 flex items-center justify-start gap-8 w-full pt-4 mt-16 mb-6 border-b border-b-gray-200 bg-gray-50 overflow-x-auto overflow-y-hidden">
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
            <div className="w-full py-5 px-0 sm:px-10">
                {activeTab === "Password" && <Password />}
                {activeTab === "My details" && <MyDetails />}
            </div>
        </>
    );
};

type Tab = "My details" | "Profile" | "Password" | "Notifications";

export default StudentMe;
