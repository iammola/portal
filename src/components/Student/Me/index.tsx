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
    if (router.isReady) {
      const initialTab = (router.query.tab as Tab) ?? "My details";
      const [pathname, query, ...args] = ["/me", { tab: activeTab }, undefined, { shallow: true }] as const;

      if (activeTab === undefined && tabs.includes(initialTab)) setActiveTab(initialTab);
      else if (activeTab === "My details" && router.query.tab !== undefined) void router.push({ pathname }, ...args);
      else if (!["My details", router.query.tab].includes(activeTab)) void router.push({ query, pathname }, ...args);
    }
  }, [activeTab, router, tabs]);

  return (
    <>
      <div className="sticky top-0 z-10 mt-16 mb-6 flex w-full items-center justify-start gap-x-8 overflow-x-auto overflow-y-hidden border-b border-b-slate-200 bg-slate-50 pt-4">
        {tabs.map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={classNames(
              "group relative inline-block w-max min-w-max cursor-pointer pb-5 text-sm font-medium tracking-wide",
              [activeTab === tab, "text-slate-900", "text-slate-500 hover:text-slate-900"]
            )}
          >
            {tab}
            {tabBadges[tab] !== undefined && (
              <span
                className={classNames("ml-3 rounded-full py-1 px-2.5 text-xs font-semibold", [
                  activeTab === tab,
                  "bg-slate-300 text-slate-900",
                  "bg-slate-200 text-slate-700 group-hover:bg-slate-300 group-hover:text-slate-900",
                ])}
              >
                {tabBadges[tab]}
              </span>
            )}
            {activeTab === tab && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] w-full rounded-full bg-slate-900" />
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
