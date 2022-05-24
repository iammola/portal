import { Fragment, useState } from "react";
import { Cross2Icon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useToast } from "components";
import { fetchAPIEndpoint } from "api";
import { LoadingIcon } from "components/Icons";
import { Date, Input, Password, Phone, Select, Textarea, Users } from "components/Form";

import type { NextPage } from "next";

const AcademicRecord = dynamic(() => import("components/Pages/Student").then((_) => _.AcademicRecord), {
  loading: ({ error, retry }) =>
    error == null ? (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-11 dark:text-gray-dark-11">
        <LoadingIcon className="h-[15px] w-[15px] animate-spin" />
        Loading...
      </div>
    ) : (
      <button
        type="button"
        onClick={retry}
        className="flex items-center justify-center gap-2 text-gray-11 focus:outline-none dark:text-gray-dark-11"
      >
        Try again
        <ReloadIcon />
      </button>
    ),
});

const CreateStudent: NextPage = () => {
  const toasts = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [studentTitles] = useState(() => ["Master", "Miss"]);
  const [studentGenders] = useState(() => ["Male", "Female"]);
  const [studentGuardians] = useState(() => ["father", "mother", "other"]);

  const [dob, setDob] = useState<Date>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(studentGenders[0]);
  const [name, setName] = useState<Schemas.Student.Schema["name"]>({
    full: "",
    last: "",
    first: "",
    initials: "",
    title: studentTitles[0],
  });
  const [contact, setContact] = useState<Schemas.Student.Schema["contact"]>({ email: { primary: "" } });
  const [guardians, setGuardians] = useState<Array<Record<"guardian" | "relation", string>>>([]);
  const [academic, setAcademic] = useState<Array<Record<"term" | "class", string> & { subjects: string[] }>>([]);

  function updateGuardians(action: "add"): void;
  function updateGuardians(action: "remove", idx: number): void;
  function updateGuardians(action: "update", idx: number, update: Utils.OneKey<typeof guardians[0]>): void;
  function updateGuardians(
    action: "add" | "update" | "remove",
    idx?: number,
    update?: Utils.OneKey<typeof guardians[0]>
  ) {
    if (action === "add") setGuardians((guardians) => [...guardians, { guardian: "", relation: studentGuardians[0] }]);
    if (action === "remove") setGuardians((guardians) => guardians.filter((_, guardianIdx) => guardianIdx !== idx));
    if (action === "update")
      setGuardians((guardians) =>
        guardians.map((guardian, guardianIdx) => Object.assign(guardian, guardianIdx === idx && update))
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let toastID: number;

    if (dob == undefined) return (e.target as HTMLFormElement).reportValidity();

    try {
      setIsLoading(true);
      toastID = toasts.add({ kind: "loading", description: "Processing request..." });

      const body = { name, contact, dob, username, password, academic, guardians, images: {} };
      const result = await fetchAPIEndpoint<API.Student.POST.Data, API.Student.POST.Body>("/api/students", {
        method: "POST",
        body: { ...body, gender: gender[0] },
      });

      setIsLoading(false);
      toasts.remove(toastID);

      if (result.success) {
        toasts.add({ kind: "success", description: "Created successfully!!" });

        setUsername("");
        setPassword("");
        setAcademic([]);
        setGuardians([]);
        setDob(undefined);
        setGender(studentGenders[0]);
        setName({ full: "", last: "", first: "", initials: "", title: studentTitles[0] });
        setContact({ email: { primary: "" }, phone: { primary: "" }, address: { primary: "" } });
      } else throw result.error;
    } catch (error) {
      console.error(error);
      if (typeof error === "string") toasts.add({ kind: "error", description: error });
      if (typeof error === "object") toasts.add({ kind: "error", description: "Couldn't complete request" });
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Create a Student Account &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Student Account</h3>
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="flex w-full grow flex-col items-center justify-start gap-7"
        >
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
                  required
                  value={name.full}
                  autoComplete="name"
                  disabled={isLoading}
                  onChange={(full) => setName((name) => ({ ...name, full }))}
                >
                  Full name
                </Input>
              </div>
              <div className="grid gap-6 sm:grid-cols-[100px_repeat(2,_minmax(0,1fr))]">
                <Input
                  required
                  disabled={isLoading}
                  value={name.initials}
                  onChange={(initials) => setName((name) => ({ ...name, initials }))}
                >
                  Initials
                </Input>
                <Input
                  required
                  value={name.first}
                  disabled={isLoading}
                  autoComplete="given-name"
                  onChange={(first) => setName((name) => ({ ...name, first }))}
                >
                  First name
                </Input>
                <Input
                  required
                  value={name.last}
                  disabled={isLoading}
                  autoComplete="family-name"
                  onChange={(last) => setName((name) => ({ ...name, last }))}
                >
                  Last name
                </Input>
              </div>
              <div className="w-full sm:w-[75%]">
                <Input
                  value={name.other}
                  disabled={isLoading}
                  autoComplete="additional-name"
                  onChange={(other) => setName((name) => ({ ...name, other }))}
                >
                  Other name(s)
                </Input>
              </div>
              <div className="grid gap-6 xs:grid-cols-[max-content_minmax(max-content,200px)]">
                <Date required disabled={isLoading} value={dob} onChange={setDob} autoComplete="bday">
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
                  disabled={isLoading}
                  value={contact.email.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, email: { ...contact.email, primary } }))
                  }
                >
                  Email Address
                </Input>
                <Input
                  disabled={isLoading}
                  value={contact.email.other}
                  onChange={(other) => setContact((contact) => ({ ...contact, email: { ...contact.email, other } }))}
                >
                  Email Address (other)
                </Input>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Phone
                  disabled={isLoading}
                  value={contact.phone?.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, phone: { ...(contact.phone ?? {}), primary } }))
                  }
                >
                  Phone Number
                </Phone>
                <Phone
                  disabled={isLoading}
                  value={contact.phone?.other}
                  onChange={(other) =>
                    setContact((contact) => ({ ...contact, phone: { ...(contact.phone ?? {}), other } }))
                  }
                >
                  Phone Number (other)
                </Phone>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Textarea
                  disabled={isLoading}
                  value={contact.address?.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, address: { ...(contact.address ?? {}), primary } }))
                  }
                >
                  Home Address
                </Textarea>
                <Textarea
                  disabled={isLoading}
                  value={contact.address?.other}
                  onChange={(other) =>
                    setContact((contact) => ({ ...contact, address: { ...(contact.address ?? {}), other } }))
                  }
                >
                  Address (other)
                </Textarea>
              </div>
            </div>
          </section>
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Guardians</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              {guardians.map((item, idx) => (
                <div key={idx} className="grid grid-cols-[minmax(0,1fr),max-content] gap-3 md:gap-6">
                  <div className="grid min-w-0 grid-cols-none grid-rows-2 gap-3 md:grid-cols-2 md:grid-rows-none md:gap-6">
                    <Select
                      required
                      label="Guardian"
                      value={item.relation}
                      onValueChange={(relation) => updateGuardians("update", idx, { relation })}
                    >
                      {studentGuardians.map((relation) => (
                        <Select.Item key={relation} value={relation}>
                          {relation}
                        </Select.Item>
                      ))}
                    </Select>
                    <Users
                      required
                      disabled={isLoading}
                      value={item.guardian}
                      onChange={(guardian) => updateGuardians("update", idx, { guardian })}
                    >
                      Guardian
                    </Users>
                  </div>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => updateGuardians("remove", idx)}
                    className="shrink-0 self-center rounded-full p-1 hover:bg-gray-4 focus:outline-none dark:hover:bg-gray-dark-4 md:p-2 "
                  >
                    <Cross2Icon className="text-gray-12 dark:text-gray-dark-12" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => updateGuardians("add")}
                className="inline-flex w-full max-w-[175px] items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
              >
                <PlusIcon />
                Add Guardian
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
                    disabled={isLoading}
                    updateTerm={(term) => updateAcademic("update", idx, { term })}
                    updateClass={(value) => updateAcademic("update", idx, { class: value })}
                    updateSubjects={(subjects) => updateAcademic("update", idx, { subjects })}
                  />
                </div>
              ))}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => updateAcademic("add")}
                className="inline-flex w-full min-w-max max-w-[250px] items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
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
                <Input required value={username} disabled={isLoading} onChange={setUsername}>
                  Username
                </Input>
              </div>
              <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                <Password required disabled={isLoading} value={password} onChange={setPassword}>
                  Password
                </Password>
              </div>
            </div>
          </section>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
          >
            {isLoading ? (
              <Fragment>
                <LoadingIcon className="h-[15px] w-[15px] animate-spin" />
                Processing...
              </Fragment>
            ) : (
              "Create Student"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
