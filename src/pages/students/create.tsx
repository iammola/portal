import { Fragment, useState } from "react";
import { Cross2Icon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import dynamic from "next/dynamic";

import { LoadingIcon } from "components/Icons";
import { Date, Input, Password, Phone, Select, Textarea, Users } from "components/Form";

import type { NextPage } from "next";

const AcademicRecord = dynamic(() => import("components/Pages/Student").then((_) => _.AcademicRecord), {
  loading: ({ error, retry }) =>
    error == null ? (
      <div className="flex flex-col items-center justify-center gap-4 py-2 text-xs text-gray-11 dark:text-gray-dark-11">
        <LoadingIcon className="animate-spin" />
        Loading...
      </div>
    ) : (
      <button
        type="button"
        onClick={retry}
        className="text=xs flex items-center justify-center gap-1 text-gray-11 dark:text-gray-dark-11"
      >
        Try again
        <ReloadIcon />
      </button>
    ),
});

const CreateStudent: NextPage = () => {
  const [studentTitles] = useState(() => ["Master", "Miss"]);
  const [studentGenders] = useState(() => ["Male", "Female"]);
  const [studentRelatives] = useState(() => ["father", "mother", "other"]);

  const [dob, setDob] = useState<Date>();
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(studentGenders[0]);
  const [name, setName] = useState<Schemas.Student.Schema["name"]>({
    full: "",
    last: "",
    first: "",
    initials: "",
    username: "",
    title: studentTitles[0],
  });
  const [contact, setContact] = useState<Schemas.Student.Schema["contact"]>({
    email: { primary: "" },
    phone: { primary: "" },
    address: { primary: "" },
  });
  const [relatives, setRelatives] = useState<Array<Record<"guardian" | "relation", string>>>([]);
  const [academic, setAcademic] = useState<Array<Record<"term" | "class", string> & { subjects: string[] }>>([]);

  function updateRelatives(action: "add"): void;
  function updateRelatives(action: "remove", idx: number): void;
  function updateRelatives(action: "update", idx: number, update: Utils.OneKey<typeof relatives[0]>): void;
  function updateRelatives(
    action: "add" | "update" | "remove",
    idx?: number,
    update?: Utils.OneKey<typeof relatives[0]>
  ) {
    if (action === "add") setRelatives((relatives) => [...relatives, { guardian: "", relation: studentRelatives[0] }]);
    if (action === "remove") setRelatives((relatives) => relatives.filter((_, relativeIdx) => relativeIdx !== idx));
    if (action === "update")
      setRelatives((relatives) =>
        relatives.map((relative, relativeIdx) => Object.assign(relative, relativeIdx === idx && update))
      );
  }

  function updateAcademic(action: "add"): void;
  function updateAcademic(action: "remove", idx: number): void;
  function updateAcademic(action: "update", idx: number, update: Utils.OneKey<typeof academic[0]>): void;
  function updateAcademic(
    action: "add" | "remove" | "update",
    idx?: number,
    update?: Utils.OneKey<typeof academic[0]>
  ) {
    if (action === "add") setAcademic((academic) => [...academic, { term: "", class: "", subjects: [] }]);
    if (action === "remove") setAcademic((academic) => academic.filter((_, academicIdx) => academicIdx !== idx));
    if (action === "update")
      setAcademic((academic) =>
        academic.map((academic, academicIdx) => Object.assign(academic, academicIdx === idx && update))
      );
  }

  return (
    <Fragment>
      <Head>
        <title>Create a Student Account &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
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
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">
                Contact Information
              </h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  required
                  value={contact.email.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, email: { ...contact.email, primary } }))
                  }
                >
                  Email Address
                </Input>
                <Input
                  value={contact.email.other}
                  onChange={(other) => setContact((contact) => ({ ...contact, email: { ...contact.email, other } }))}
                >
                  Email Address (other)
                </Input>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Phone
                  required
                  value={contact.phone.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, phone: { ...contact.phone, primary } }))
                  }
                >
                  Phone Number
                </Phone>
                <Phone
                  value={contact.phone.other}
                  onChange={(other) => setContact((contact) => ({ ...contact, phone: { ...contact.phone, other } }))}
                >
                  Phone Number (other)
                </Phone>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Textarea
                  required
                  value={contact.address.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, address: { ...contact.address, primary } }))
                  }
                >
                  Home Address
                </Textarea>
                <Textarea
                  value={contact.address.other}
                  onChange={(other) =>
                    setContact((contact) => ({ ...contact, address: { ...contact.address, other } }))
                  }
                >
                  Address (other)
                </Textarea>
              </div>
            </div>
          </section>
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Relatives</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              {relatives.map((item, idx) => (
                <div key={idx} className="grid grid-cols-[minmax(0,1fr),max-content] gap-3 md:gap-6">
                  <div className="grid min-w-0 grid-cols-none grid-rows-2 gap-3 md:grid-cols-2 md:grid-rows-none md:gap-6">
                    <Select
                      required
                      label="Relative"
                      value={item.relation}
                      onValueChange={(relation) => updateRelatives("update", idx, { relation })}
                    >
                      {studentRelatives.map((relation) => (
                        <Select.Item key={relation} value={relation}>
                          {relation}
                        </Select.Item>
                      ))}
                    </Select>
                    <Users
                      required
                      value={item.guardian}
                      onChange={(guardian) => updateRelatives("update", idx, { guardian })}
                    >
                      Guardian
                    </Users>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateRelatives("remove", idx)}
                    className="shrink-0 self-center rounded-full p-1 hover:bg-gray-4 dark:hover:bg-gray-dark-4 md:p-2 "
                  >
                    <Cross2Icon className="text-gray-12 dark:text-gray-dark-12" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateRelatives("add")}
                className="inline-flex w-full max-w-[175px] items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
              >
                <PlusIcon />
                Add Relative
              </button>
            </div>
          </section>
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Academic History</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              {academic.map((item, idx) => (
                <div key={idx} className="grid grid-rows-[minmax(0,1fr),max-content] gap-6 md:gap-3">
                  <AcademicRecord
                    {...item}
                    updateTerm={(term) => updateAcademic("update", idx, { term })}
                    updateClass={(value) => updateAcademic("update", idx, { class: value })}
                    updateSubjects={(subjects) => updateAcademic("update", idx, { subjects })}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateAcademic("add")}
                className="inline-flex w-full min-w-max max-w-[250px] items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
              >
                <PlusIcon className="shrink-0" />
                Add Academic History
              </button>
            </div>
          </section>
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Profile</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                <Input
                  required
                  value={name.username}
                  onChange={(username) => setName((name) => ({ ...name, username }))}
                >
                  Username
                </Input>
              </div>
              <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                <Password required value={password} onChange={setPassword}>
                  Password
                </Password>
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