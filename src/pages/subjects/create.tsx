import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Fragment, useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import useSWR from "swr";
import Head from "next/head";
import dynamic from "next/dynamic";

import { fetchAPI } from "api/client";
import { verifyLevel } from "utils/pages";
import { useToast } from "components/Toast";
import { LoadingIcon } from "components/Icons";
import { useIsomorphicLayoutEffect } from "hooks";
import { Checkbox, Input, RadioGroup, Select, Users } from "components/Form";

import type { GetServerSideProps, NextPage } from "next";

const DivisionSubject = dynamic(async () => {
  const { DivisionSubjectFields } = await import("components/Pages/Subject");
  return DivisionSubjectFields;
});

type Division = { teachers: string; name: Schemas.Subject.DivisionSchema["name"] };
const CreateSubject: NextPage = () => {
  const { data: classes } = useSWR<API.Result<API.Class.GET.AllData>>("/api/classes");

  const toasts = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [mandatory, setMandatory] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [__type, setType] = useState("base" as Schemas.Subject.Record["__type"]);
  const [name, setName] = useState<Schemas.Subject.Record["name"]>({ long: "", short: "" });

  /* Base `__type` */
  const [teachers, setTeachers] = useState("");
  /* Group `__type` */
  const [divisions, setDivisions] = useState<Division[]>([]);

  function updateDivision(action: "add"): void;
  function updateDivision(action: "remove", idx: number): void;
  function updateDivision(action: "update", idx: number, update: Utils.OneKey<Division>): void;
  function updateDivision(action: "add" | "remove" | "update", idx?: number, update?: Utils.OneKey<Division>) {
    if (action === "add") setDivisions((divisions) => [...divisions, { name: { long: "", short: "" }, teachers: "" }]);
    if (action === "remove") setDivisions((divisions) => divisions.filter((_, divisionIdx) => divisionIdx !== idx));
    if (action === "update")
      setDivisions((divisions) =>
        divisions.map((division, divisionIdx) => Object.assign(division, divisionIdx === idx && update))
      );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let toastID: number;

    try {
      if (__type === "group") {
        const divisionNames = divisions.map((div) => [div.name.long, div.name.short]).flat();

        // TODO: Use a better method to communicate to the user
        if (divisionNames.length !== new Set(divisionNames).size) return alert("Duplicate division names found");
      }

      setIsLoading(true);
      toastID = toasts.add({ kind: "loading", description: "Processing request..." });

      const result = await fetchAPI<API.Class.POST.Subjects.Data, API.Class.POST.Subjects.Body>(
        `/api/classes/${selectedClass}/subjects`,
        {
          method: "POST",
          body: {
            name,
            __type,
            mandatory: mandatory ? true : undefined,
            teachers: __type === "base" ? teachers.split(" ") : [],
            divisions:
              __type === "group" ? divisions.map((div) => ({ ...div, teachers: div.teachers.split(" ") })) : [],
          },
        }
      );

      setIsLoading(false);
      toasts.remove(toastID);

      if (result.success) {
        toasts.add({ kind: "success", description: "Created successfully!!" });

        setTeachers("");
        setDivisions([]);
        setMandatory(false);
        setSelectedClass("");
        setName({ long: "", short: "" });
        setType((t) => "base" as typeof t);
      } else throw result.error;
    } catch (error) {
      console.error(error);
      if (typeof error === "string") toasts.add({ kind: "error", description: error });
      if (typeof error === "object") toasts.add({ kind: "error", description: "Couldn't complete request" });
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (selectedClass || !classes?.success || classes.data.length < 1) return;
    setSelectedClass(String(classes.data[0]._id));
  }, [classes, selectedClass]);

  useIsomorphicLayoutEffect(() => {
    setTeachers("");
    setDivisions([]);
  }, [__type]);

  useIsomorphicLayoutEffect(() => {
    if (divisions.length > 0 || __type === "base") return;
    updateDivision("add");
    updateDivision("add");
  }, [__type, divisions.length, updateDivision]);

  return (
    <Fragment>
      <Head>
        <title>Create a Subject &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Subject</h3>
        <form onSubmit={(e) => void handleSubmit(e)} className="w-full max-w-md space-y-10">
          <div className="space-y-7">
            <Select required label="Class" value={selectedClass} onValueChange={setSelectedClass}>
              {classes?.success &&
                classes.data.map((item, idx) => (
                  <Select.Item key={idx} value={String(item._id)}>
                    {item.name.long}
                  </Select.Item>
                ))}
            </Select>
            <div className="flex items-center justify-start gap-4">
              <div className="w-2/3">
                <Input required value={name.long} onValueChange={(long) => setName((name) => ({ ...name, long }))}>
                  Name
                </Input>
              </div>
              <div className="w-1/3">
                <Input required value={name.short} onValueChange={(short) => setName((name) => ({ ...name, short }))}>
                  Alias
                </Input>
              </div>
            </div>
            <Checkbox checked={mandatory} onCheckedChange={(c) => setMandatory(c as boolean)}>
              Is this subject mandatory?
            </Checkbox>
            <div className="w-full space-y-2">
              <span className="font-medium text-gray-12 dark:text-gray-dark-12">Choose a subject type</span>
              <RadioGroup value={__type} onValueChange={(e) => setType(e as typeof __type)}>
                <RadioGroup.Item value="base">
                  <div className="cursor-pointer space-y-1 py-3 px-5">
                    <h4 className="font-medium text-gray-12 dark:text-gray-dark-12">Base</h4>
                    <p className="text-sm text-gray-11 dark:text-gray-dark-11">
                      This subject doesn&apos;t have divisions. It is a standalone subject.
                    </p>
                  </div>
                </RadioGroup.Item>
                <RadioGroup.Item value="group">
                  <div className="cursor-pointer space-y-1 py-3 px-5">
                    <h4 className="font-medium text-gray-12 dark:text-gray-dark-12">Group</h4>
                    <p className="text-sm text-gray-11 dark:text-gray-dark-11">
                      This subject has divisions. It is grouped with a collective name.
                    </p>
                  </div>
                </RadioGroup.Item>
              </RadioGroup>
            </div>
            {__type === "base" ? (
              <Users required value={teachers} onValueChange={setTeachers}>
                Teachers
              </Users>
            ) : (
              <div className="flex w-full flex-col items-start justify-center gap-4">
                <span className="select-none text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">
                  Divisions
                </span>
                <div className="space-y-7">
                  {divisions.map((division, idx) => (
                    <div key={idx} className="space-y-3">
                      <SeparatorPrimitive.Root className="h-px w-full bg-gray-6 px-6 dark:bg-gray-dark-6" />
                      <div className="flex flex-col items-start justify-start space-y-2">
                        <div className="flex w-full select-none items-center justify-between gap-1.5">
                          <span className="text-sm text-gray-11 dark:text-gray-dark-11">Division {idx + 1}</span>
                          {divisions.length > 2 && (
                            <button
                              type="button"
                              onClick={() => updateDivision("remove", idx)}
                              className="rounded p-2 text-gray-11 hover:bg-gray-4 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4"
                            >
                              <Cross2Icon />
                            </button>
                          )}
                        </div>
                        <DivisionSubject
                          {...division}
                          removeDivision={() => updateDivision("remove", idx)}
                          updateDivision={(update) => updateDivision("update", idx, update)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => updateDivision("add")}
                  className="inline-flex w-full max-w-[175px] items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
                >
                  <PlusIcon />
                  Add Division
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
          >
            {isLoading ? (
              <Fragment>
                <LoadingIcon className="h-[15px] w-[15px] animate-spin" />
                Processing...
              </Fragment>
            ) : (
              "Create Subject"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const allowed = await verifyLevel(req, "staff");
  return allowed ? { props: {} } : { notFound: true };
};

export default CreateSubject;
