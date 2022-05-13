import Head from "next/head";
import { Fragment, useState } from "react";

import { useToast } from "components";
import { fetchAPIEndpoint } from "api";
import { Input, Users } from "components/Form";

import type { NextPage } from "next";

const CreateClass: NextPage = () => {
  const toasts = useToast();
  const [teachers, setTeachers] = useState("");
  const [name, setName] = useState({ long: "", short: "", special: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let toastID: number;

    try {
      toastID = toasts.add({ kind: "loading", description: "Creating class..." });

      const result = await fetchAPIEndpoint<API.Class.POST.Data, API.Class.POST.Body>("/api/classes", {
        method: "POST",
        body: { name, teachers: teachers.split(" ") },
      });

      toasts.remove(toastID);

      if (result.success) toasts.add({ kind: "success", description: "Created successfully!!" });
      else throw result.error;
    } catch (error) {
      console.error(error);
      if (typeof error === "string") toasts.add({ kind: "error", description: error });
      if (typeof error === "object") toasts.add({ kind: "error", description: "Couldn't complete request" });
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Create a Class &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Class</h3>
        <form onSubmit={(e) => void handleSubmit(e)} className="w-full max-w-xs space-y-10">
          <div className="space-y-7">
            <Input required value={name.long} onChange={(long) => setName((name) => ({ ...name, long }))}>
              Name
            </Input>
            <Input required value={name.short} onChange={(short) => setName((name) => ({ ...name, short }))}>
              Alias
            </Input>
            <Input value={name.special} onChange={(special) => setName((name) => ({ ...name, special }))}>
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
