import Head from "next/head";
import { Fragment, useState } from "react";
import { Tab, Transition } from "@headlessui/react";

import { useTabs } from "hooks";
import { classNames } from "utils";
import { ClassesList } from "components/Class";

import type { NextPage } from "next";

const Classes: NextPage = () => {
  const [tabs] = useState({
    Table: <ClassesList />,
    Create: "",
  });
  const [activeTab, setActiveTab] = useTabs(Object.keys(tabs), 0);

  return (
    <Fragment>
      <Head>
        <title>Classes | GRS Portal</title>
      </Head>
      <h1 className="flex items-center justify-center pt-6 pb-8 text-6xl font-light uppercase tracking-wide text-slate-700">
        Classes
      </h1>
      <div className="w-full pt-5">
        <Tab.Group
          manual
          selectedIndex={activeTab}
          onChange={setActiveTab}
        >
          <Tab.List className="group mx-auto flex items-center justify-center border-b-2">
            {Object.keys(tabs).map((t, i) => (
              <Tab
                key={t}
                className="relative cursor-pointer px-6 pb-2 text-sm tracking-wider text-slate-500"
              >
                {({ selected }) => (
                  <>
                    {t}
                    <Transition
                      enterFrom="scale-x-0"
                      enterTo="scale-x-100"
                      leaveTo="scale-x-0"
                      leaveFrom="scale-x-100"
                      show={selected}
                      className={classNames(
                        "absolute bottom-0 left-0 h-[3px] w-full bg-gray-600 transition-all duration-100",
                        [i === 0, "origin-right", "origin-left"]
                      )}
                    />
                  </>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4 px-6">
            {Object.values(tabs).map((t, i) => (
              <Tab.Panel
                key={i}
                className="h-full w-full"
              >
                {t}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Fragment>
  );
};

export default Classes;
