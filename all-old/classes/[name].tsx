import useSWR from "swr";
import Head from "next/head";
import { format } from "date-fns";
import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";

import { connect } from "db";
import { useTabs } from "utils";
import { ClassModel } from "db/models";
import { Breadcrumbs } from "all-old/components";
import { Students, Subjects, Teachers } from "all-old/components/Class";

import type { NextPage, GetServerSideProps } from "next";

const Class: NextPage<API.Class.GET.Data> = (props) => {
  const { data: studentsCount } = useSWR<API.Response<API.Class.GET.Students.Count>>(
    `/api/classes/${String(props._id)}/students/count`
  );
  const { data: { data } = { data: props } } = useSWR<API.Response<API.Class.GET.Data>>(
    `/api/classes/${props._id.toString()}`
  );
  const [tabs] = useState({
    Feed: "",
    Students: <Students id={String(props._id)} />,
    Subjects: <Subjects id={String(props._id)} />,
    Teachers: <Teachers id={String(props._id)} />,
  });
  const [tabEmoji] = useState<Record<keyof typeof tabs, string>>({
    Feed: "🌐",
    Students: "👨‍🎓",
    Subjects: "📚",
    Teachers: "👨‍🏫",
  });
  const [activeTab, setActiveTab] = useTabs(Object.keys(tabs), 0);

  return (
    <Fragment>
      <Head>
        <title>{data.name.long} | GRS Portal</title>
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start">
        <header className="bg-slate-100 grid w-full grid-cols-[minmax(0,_1fr)_max-content] grid-rows-3 px-8 pt-4 pb-6">
          <Breadcrumbs className="row-start-1 row-end-2 min-w-0" />
          <h3 className="text-slate-700 row-start-2 row-end-3 min-w-0 text-4xl font-semibold capitalize">
            {data.name.long}
          </h3>
          <p className="text-slate-500 row-start-3 row-end-4 flex min-w-0 gap-x-1 pt-2 text-xs font-light tracking-wide">
            <span>Since {format(new Date(data.createdAt), "do MMMM yyyy")}</span>
            &middot;
            {!studentsCount ? (
              "Loading students count"
            ) : (
              <span>
                {studentsCount.data.count} student{studentsCount.data.count !== 1 && "s"}
              </span>
            )}
            &middot;
            <span>
              {data.subjectsCount} subject{data.subjectsCount !== 1 && "s"}
            </span>
          </p>
          <div className="col-start-2 col-end-3 row-start-1 row-end-4 min-w-0" />
        </header>
        <section className="flex w-full grow items-stretch justify-start">
          <Tab.Group
            manual
            vertical
            onChange={setActiveTab}
            selectedIndex={activeTab}
          >
            <Tab.List className="shrink-0 space-y-2 overflow-y-auto">
              {Object.keys(tabs).map((t) => (
                <Tab
                  key={t}
                  className="hover:bg-slate-50 flex w-full cursor-pointer items-center justify-start gap-x-3 rounded-md p-2"
                >
                  <span>{tabEmoji[t as unknown as keyof typeof tabEmoji]}</span>
                  <span className="text-slate-700 text-sm">{t}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="grow px-4">
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
        </section>
      </section>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<API.Class.GET.Data> = async ({ params }) => {
  return {
    props: {
      order: 1,
      subjectsCount: 10,
      createdAt: Date.now() as unknown as Date,
      _id: "_id" as unknown as API.Class.GET.Data["_id"],
      name: {
        long: "Key Stage 1",
        short: "KS1",
        special: "Gold",
      },
    },
  };
  await connect();
  const data = await ClassModel.findByName(params?.name as string, "long", "-teachers")
    .populate<{ subjectsCount: number }>("subjectsCount")
    .lean();

  if (data === null) return { notFound: true };

  return { props: JSON.parse(JSON.stringify(data)) as API.Class.GET.Data };
};

export default Class;
