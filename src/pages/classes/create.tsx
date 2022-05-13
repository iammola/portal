import Head from "next/head";
import { Fragment, useState } from "react";

import { Input, Users } from "components/Form";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
  const [teachers, setTeachers] = useState("");
  const [name, setName] = useState({ long: "", short: "", special: "" });

  return (
    <Fragment>
      <Head>
        <title>Create a Class &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Class</h3>
        <form className="w-full max-w-xs space-y-10">
          <div className="space-y-7">
            <Input required value={name.long} onChange={(long) => setName((name) => ({ ...name, long }))}>
              Name
            </Input>
            <Input required value={name.short} onChange={(short) => setName((name) => ({ ...name, short }))}>
              Alias
            </Input>
            <Input required value={name.special} onChange={(special) => setName((name) => ({ ...name, special }))}>
              Special name
            </Input>
            <Users value={teachers} onChange={setTeachers}>
              Teachers
            </Users>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 dark:text-gray-dark-12"
          >
            Create Class
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateClass;
