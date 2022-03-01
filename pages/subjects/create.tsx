import Head from "next/head";
import { FormEvent, useMemo, useState } from "react";

import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";
import { Input, Select } from "components/Form";
import { useIsomorphicLayoutEffect } from "hooks";
import {
  BaseSubject,
  GroupSubject,
  SubjectType,
} from "components/Create/Subject";

import type { NextPage } from "next";
import type { SubjectRecord } from "types/schema";
import type { Value as EmailValue } from "components/Form/Email";
import type { Value as SelectValue } from "components/Form/Select";
import type { DivisionValue } from "components/Create/Subject/Group";
import type {
  CreateSubjectData,
  CreateSubjectRequestBody,
} from "types/api/subjects";

const CreateSubject: NextPage = () => {
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [mandatory, setMandatory] = useState(false);
  const [teachers, setTeachers] = useState<EmailValue[]>();
  const [__type, setType] = useState<SubjectRecord["__type"]>();
  const [selectedClass, setSelectedClass] = useState<SelectValue>();
  const [groupSubjects, setGroupSubjects] = useState<DivisionValue[]>();
  const divisionTemplate = useMemo<DivisionValue>(
    () => ({
      name: "",
      alias: "",
      teachers: [],
    }),
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (__type !== undefined) {
      setTeachers(undefined);
      setGroupSubjects(
        __type === "group"
          ? [{ ...divisionTemplate }, { ...divisionTemplate }]
          : undefined
      );
    }
  }, [__type, divisionTemplate]);

  const addSubjectDivision = () =>
    setGroupSubjects((p) => [...(p ?? []), { ...divisionTemplate }]);

  const removeSubjectDivision = (idx: number) =>
    setGroupSubjects((p) => p?.filter((_, i) => i !== idx));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedClass?.id && __type) {
      try {
        await fetchAPIEndpoint<CreateSubjectData, CreateSubjectRequestBody>(
          "/api/classes/${selectedClass.id}/subjects",
          {
            method: "POST",
          },
          {
            name,
            alias,
            __type,
            mandatory,
            class: selectedClass.id,
            teachers: teachers?.map((t) => t.mail),
            divisions: groupSubjects?.map((g) => ({
              ...g,
              teachers: g.teachers.map((t) => t.mail),
            })),
          } as unknown as CreateSubjectRequestBody
        );
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  return (
    <main className="flex h-full min-h-screen w-screen flex-row items-stretch justify-center bg-slate-200 font-poppins">
      <Head>
        <title>Create Subject | Portal | GRS™</title>
        <meta name="description" content="Page for Subject Creation" />
      </Head>
      <section className="flex w-full grow flex-col items-center justify-center py-12">
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="w-[35rem] space-y-10 rounded-2xl bg-white px-10 py-8 shadow-lg"
        >
          <h1 className="text-center text-4xl font-bold text-slate-600">
            <span>Create</span>{" "}
            <span className="bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Subject
            </span>
          </h1>
          <div className="space-y-8">
            <Select
              options={[]}
              label="Class name"
              value={selectedClass}
              onChange={setSelectedClass}
            />
            <div className="flex w-full flex-row md:gap-x-3 lg:gap-x-5">
              <div className="w-1/2">
                <Input
                  required
                  id="name"
                  value={name}
                  onChange={setName}
                  label="Subject name"
                  className={(valid) =>
                    classNames(
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                          valid === true,
                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                          valid === false,
                      }
                    )
                  }
                />
              </div>
              <div className="w-1/2">
                <Input
                  required
                  id="alias"
                  value={alias}
                  onChange={setAlias}
                  label="Subject alias"
                  className={(valid) =>
                    classNames(
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                          valid === true,
                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                          valid === false,
                      }
                    )
                  }
                />
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-start gap-x-2">
              <input
                type="checkbox"
                checked={mandatory}
                className="h-4 w-4"
                id="requiredSubject"
                onChange={(e) => setMandatory(e.target.checked)}
              />
              <label
                htmlFor="requiredSubject"
                className="text-sm font-medium text-slate-700"
              >
                Is this subject mandatory?
              </label>
            </div>
            <SubjectType className="w-full space-y-5">
              <SubjectType.Label className="font-medium text-slate-800">
                Choose a subject type
              </SubjectType.Label>
              <SubjectType.Options
                value={__type}
                id="subjectType"
                onChange={setType}
                className="flex w-full flex-row items-stretch justify-start md:gap-x-3 lg:gap-x-5"
              />
            </SubjectType>
            {__type === "base" ? (
              <BaseSubject
                teachers={{ values: teachers, onChange: setTeachers }}
              />
            ) : (
              <GroupSubject
                values={groupSubjects}
                onChange={setGroupSubjects}
                addDivision={addSubjectDivision}
                removeDivision={removeSubjectDivision}
              />
            )}
          </div>
          <button
            type="submit"
            className="mt-5 w-full overflow-hidden rounded-lg bg-blue-500 py-3 px-5 font-bold uppercase tracking-wide text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:hover:ring-blue-600"
          >
            Finish
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateSubject;
