import { FormEvent, useCallback, useState } from "react";
import Head from "next/head";

import { Input, Email } from "components/Form";
import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";

import type { NextPage } from "next";
import type { Value } from "components/Form/Email";
import type {
  CreateClassData,
  CreateClassRequestBody,
} from "types/api/classes";

const CreateClass: NextPage = () => {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [special, setSpecial] = useState("");
  const [teachers, setTeachers] = useState<Value[]>([]);

  const inputClassName = useCallback(
    (valid) =>
      classNames(
        "w-[20rem] h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
        {
          "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid === true,
          "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
        }
      ),
    []
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await fetchAPIEndpoint<
        CreateClassData,
        CreateClassRequestBody
      >(
        "/api/classes",
        { method: "POST" },
        {
          name,
          alias,
          special,
          teachers: teachers
            .map(({ _id }) => _id as NonNullable<typeof _id>)
            .filter(Boolean),
        }
      );

      if (result.success) {
        console.warn(result.message, result.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <main className="flex h-full min-h-screen w-screen flex-row items-stretch justify-center bg-slate-50 font-poppins dark:bg-slate-900">
      <Head>
        <title>Create Class | GRIS Portal</title>
        <meta name="description" content="Create class" />
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start">
        <h1 className="p-10 text-5xl font-semibold text-slate-600 dark:text-slate-300">
          <span>Create a</span>{" "}
          <span className="bg-gradient-to-br from-emerald-300 to-emerald-600 bg-clip-text text-transparent">
            Class
          </span>
        </h1>
        <div className="flex h-full flex-row items-center justify-center self-center py-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-y-8 overflow-hidden rounded-2xl bg-white p-10 shadow-lg"
          >
            <Input
              required
              id="name"
              type="text"
              value={name}
              label="Name"
              onChange={setName}
              className={inputClassName}
            />
            <Input
              required
              id="alias"
              type="text"
              value={alias}
              label="Alias"
              onChange={setAlias}
              className={inputClassName}
            />
            <Input
              required
              id="special"
              type="text"
              value={special}
              label="Special name"
              onChange={setSpecial}
              className={inputClassName}
            />
            <Email className="flex w-[20rem] flex-col items-start justify-start gap-y-4 font-inter">
              <Email.Label className="font-medium text-slate-800">
                Teachers
              </Email.Label>
              <Email.Field
                values={teachers}
                userType="teacher"
                onChange={setTeachers}
                className="flex w-full grow flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 rounded-lg border border-slate-200 bg-white p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
              />
            </Email>
            <button
              type="submit"
              className="mt-5 w-full overflow-hidden rounded-lg bg-emerald-500 py-3 px-5 font-medium uppercase tracking-wide text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white focus:hover:ring-emerald-600"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateClass;
