import { Fragment, useState } from "react";
import Head from "next/head";

import { Checkbox, Input, RadioGroup, Select } from "components/Form";

import type { NextPage } from "next";

const CreateSubject: NextPage = () => {
  const classes: API.Class.GET.AllData["classes"] = [];

  const [mandatory, setMandatory] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [__type, setType] = useState("base" as Schemas.Subject.Record["__type"]);
  const [name, setName] = useState<Schemas.Subject.Record["name"]>({ long: "", short: "" });

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
