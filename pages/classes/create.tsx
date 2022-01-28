import { FormEvent, useCallback, useState } from "react";
import Head from "next/head";

import Input from "components/Global/Input";
import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";

import type { NextPage } from "next";
import type { Value } from "components/Global/Input/DynamicEmail";
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
    (valid?: boolean) =>
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

      if (result.success === true) {
        console.warn(result.message, result.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50 dark:bg-slate-900 font-poppins">
      <Head>
        <title>Create Class | GRIS Portal</title>
        <meta name="description" content="Create class" />
      </Head>
      <section className="flex flex-col items-start justify-start grow w-full">
        <h1 className="text-5xl font-semibold text-slate-600 dark:text-slate-300 p-10">
          <span>Create a</span>{" "}
          <span className="bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 text-transparent">
            Class
          </span>
        </h1>
        <div className="flex flex-row items-center justify-center self-center h-full py-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-8 items-center justify-center bg-white p-10 rounded-2xl overflow-hidden shadow-lg"
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
            <Input.DynamicEmail className="flex flex-col gap-y-4 items-start justify-start w-[20rem] font-inter">
              <Input.DynamicEmail.Label className="font-medium text-slate-800">
                Teachers
              </Input.DynamicEmail.Label>
              <Input.DynamicEmail.Field
                values={teachers}
                userType="teacher"
                onChange={setTeachers}
                className="flex flex-row flex-wrap grow gap-x-3 gap-y-2 items-center justify-start w-full p-3 border border-slate-200 focus:border-transparent bg-white rounded-lg focus:outline-none ring-2 ring-transparent focus:ring-blue-400"
              />
            </Input.DynamicEmail>
            <button
              type="submit"
              className="w-full mt-5 py-3 px-5 tracking-wide bg-emerald-500 hover:bg-emerald-600 text-white font-medium uppercase rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:hover:ring-emerald-600 focus:ring-offset-white"
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
