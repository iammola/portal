import useSWR from "swr";
import Head from "next/head";
import { format } from "date-fns";
import { Tab } from "@headlessui/react";
import { Fragment, useState } from "react";

import { connect } from "db";
import { useTabs } from "hooks";
import { ClassModel } from "db/models";
import { Breadcrumbs } from "components";
import { Teachers } from "components/Class";

import type { ApiResponse } from "types/api";
import type { GetClassData } from "types/api/classes";
import type { NextPage, GetServerSideProps } from "next";

const Class: NextPage<GetClassData> = ({ children: _, ...props }) => {
  const { data: { data } = { data: props } } = useSWR<ApiResponse<GetClassData>>(
    `/api/classes/${props._id.toString()}`
  );
  const [tabs] = useState({
    Feed: "",
    Students: "",
    Subjects: "",
    Teachers: <Teachers id={String(props._id)} />,
  });
  const [activeTab, setActiveTab] = useTabs(Object.keys(tabs), 0);

  return (
    <Fragment>
      <Head>
        <title>{data.name.long} | GRS Portal</title>
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start">
        <header className="flex w-full flex-col bg-slate-100 px-8 pt-4 pb-6">
          <Breadcrumbs />
          <h3 className="text-4xl font-semibold capitalize text-slate-700">{data.name.long}</h3>
          <p className="flex gap-x-1 pt-2 text-xs font-light tracking-wide text-slate-500">
            <span>Since {format(new Date(data.createdAt), "do MMMM yyyy")}</span>
            &middot;
            <span>5 students</span>
            &middot;
            <span>
              {data.subjectsCount} subject{data.subjectsCount !== 1 && "s"}
            </span>
          </p>
        </header>
        <section className="w-full px-20 pt-10 pb-6">
                >
              ))}
        </section>
      </section>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<GetClassData> = async ({ params }) => {
  await connect();
  const data = await ClassModel.findByName(params?.name as string, "long", "-teachers")
    .populate<{ subjectsCount: number }>("subjectsCount")
    .lean();

  if (data === null) return { notFound: true };

  return { props: JSON.parse(JSON.stringify(data)) as GetClassData };
};

export default Class;
