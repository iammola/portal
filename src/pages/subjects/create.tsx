import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Fragment, useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import dynamic from "next/dynamic";

import { Checkbox, Input, RadioGroup, Select, Users } from "components/Form";

import type { NextPage } from "next";

const DivisionSubject = dynamic(() => import("components/Pages/Subject").then((_) => _.DivisionSubjectFields));

type Division = { teachers: string; name: Schemas.Subject.DivisionSchema["name"] };
const CreateSubject: NextPage = () => {
  const classes: API.Class.GET.AllData["classes"] = [];

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

  return (
    <Fragment>
      <Head>
        <title>Create a Subject &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Subject</h3>
        <form className="w-full max-w-md space-y-10">
          <div className="space-y-7">
            <Select label="Class" value={selectedClass} onValueChange={setSelectedClass}>
              {classes.map((item, idx) => (
                <Select.Item key={idx} value={String(item._id)}>
                  {item.name.long}
                </Select.Item>
              ))}
            </Select>
            <Input required value={name.long} onChange={(long) => setName((name) => ({ ...name, long }))}>
              Name
            </Input>
            <Input required value={name.short} onChange={(short) => setName((name) => ({ ...name, short }))}>
              Alias
            </Input>
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
              <Users required value={teachers} onChange={setTeachers}>
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
                          <button
                            type="button"
                            onClick={() => updateDivision("remove", idx)}
                            className="rounded p-2 text-gray-11 hover:bg-gray-4 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4"
                          >
                            <Cross2Icon />
                          </button>
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
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
          >
            Create Subject
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateSubject;