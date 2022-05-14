import { Fragment, useState } from "react";
import Head from "next/head";

import { Date, Input, Select } from "components/Form";

import type { NextPage } from "next";

const CreateStudent: NextPage = () => {
  const [studentTitles] = useState(() => ["Master", "Miss"]);
  const [studentGenders] = useState(() => ["Male", "Female"]);

  const [dob, setDob] = useState<Date>();
  const [gender, setGender] = useState(studentGenders[0]);
  const [name, setName] = useState<Schemas.Student.Schema["name"]>({
    full: "",
    last: "",
    first: "",
    initials: "",
    username: "",
    title: studentTitles[0],
  });

  return (
    <Fragment>
      <Head>
        <title>Create a Student Account &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Student Account</h3>
        <form className="flex w-full grow flex-col items-center justify-start gap-7">
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">
                Personal Information
              </h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              <div className="grid gap-6 sm:grid-cols-[minmax(max-content,200px)_minmax(0,1fr)]">
                <Select
                  required
                  label="Title"
                  value={name.title}
                  onValueChange={(title) => setName((name) => ({ ...name, title }))}
                >
                  {studentTitles.map((title) => (
                    <Select.Item key={title} value={title}>
                      {title}
                    </Select.Item>
                  ))}
                </Select>
                <Input
                  autoComplete="name"
                  required
                  value={name.full}
                  onChange={(full) => setName((name) => ({ ...name, full }))}
                >
                  Full name
                </Input>
              </div>
              <div className="grid gap-6 sm:grid-cols-[100px_repeat(2,_minmax(0,1fr))]">
                <Input
                  required
                  value={name.initials}
                  onChange={(initials) => setName((name) => ({ ...name, initials }))}
                >
                  Initials
                </Input>
                <Input
                  required
                  value={name.first}
                  autoComplete="given-name"
                  onChange={(first) => setName((name) => ({ ...name, first }))}
                >
                  First name
                </Input>
                <Input
                  required
                  value={name.last}
                  autoComplete="family-name"
                  onChange={(last) => setName((name) => ({ ...name, last }))}
                >
                  Last name
                </Input>
              </div>
              <div className="w-full sm:w-[75%]">
                <Input
                  value={name.other}
                  autoComplete="additional-name"
                  onChange={(other) => setName((name) => ({ ...name, other }))}
                >
                  Other name(s)
                </Input>
              </div>
              <div className="grid gap-6 xs:grid-cols-[max-content_minmax(max-content,200px)]">
                <Date required value={dob} onChange={setDob} autoComplete="bday">
                  Date of Birth
                </Date>
                <Select required label="Gender" value={gender} onValueChange={setGender}>
                  {studentGenders.map((gender) => (
                    <Select.Item key={gender} value={gender}>
                      {gender}
                    </Select.Item>
                  ))}
                </Select>
              </div>
            </div>
          </section>
          <button
            type="submit"
            className="w-full max-w-xs rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 dark:text-gray-dark-12"
          >
            Create Student
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
