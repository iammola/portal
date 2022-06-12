import { Fragment, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useToast } from "components/Toast";
import { fetchAPI } from "api/client";
import { LoadingIcon } from "components/Icons";
import { Date, Input, Password, Phone, RadioGroup, Select, Textarea } from "components/Form";

import type { NextPage } from "next";

const ClassTeacher = dynamic(
  async () => {
    const { ClassTeacher } = await import("components/Pages/Teacher");
    return ClassTeacher;
  },
  {
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
          <ReloadIcon />
          Try again
        </button>
      ),
  }
);

const CreateTeacher: NextPage = () => {
  const toasts = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [teacherGenders] = useState(() => ["Male", "Female"]);
  const [teacherTitles] = useState(() => ["Mr.", "Ms.", "Mrs.", "Dr."]);

  const [dob, setDob] = useState<Date>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [classes, setClasses] = useState<string[]>();
  const [gender, setGender] = useState(teacherGenders[0]);
  const [__type, setType] = useState("teacher" as Schemas.Staff.Record["__type"]);
  const [name, setName] = useState<Schemas.Staff.Base["name"]>({
    full: "",
    last: "",
    first: "",
    initials: "",
  });
  const [contact, setContact] = useState<Schemas.Staff.Base["contact"]>({ email: { primary: "" } });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let toastID: number;

    try {
      setIsLoading(true);
      toastID = toasts.add({ kind: "loading", description: "Processing request..." });
      const body = { __type, name, contact, dob, username, password, classes, images: {}, privileges: [] };
      const result = await fetchAPI<API.Staff.POST.Data, API.Staff.POST.Body>("/api/staff", {
        method: "POST",
        body: { ...body, gender: gender[0] },
      });

      setIsLoading(false);
      toasts.remove(toastID);

      if (result.success) {
        toasts.add({ kind: "success", description: "Created successfully!!" });

        setUsername("");
        setPassword("");
        setDob(undefined);
        setGender(teacherGenders[0]);
        setName({ full: "", last: "", first: "", initials: "" });
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
        <title>Create a Teacher Account &middot; Portal</title>
      </Head>
      <div className="mx-auto flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8 xl:max-w-[75rem]">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Staff Account</h3>
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
                  label="Title"
                  value={name.title}
                  onValueChange={(title) => setName((name) => ({ ...name, title }))}
                >
                  {teacherTitles.map((title) => (
                    <Select.Item key={title} value={title}>
                      {title}
                    </Select.Item>
                  ))}
                </Select>
                <Input required value={name.full} onValueChange={(full) => setName((name) => ({ ...name, full }))}>
                  Full name
                </Input>
              </div>
              <div className="grid gap-6 sm:grid-cols-[100px_repeat(2,_minmax(0,1fr))]">
                <Input
                  required
                  value={name.initials}
                  onValueChange={(initials) => setName((name) => ({ ...name, initials }))}
                >
                  Initials
                </Input>
                <Input required value={name.first} onValueChange={(first) => setName((name) => ({ ...name, first }))}>
                  First name
                </Input>
                <Input required value={name.last} onValueChange={(last) => setName((name) => ({ ...name, last }))}>
                  Last name
                </Input>
              </div>
              <div className="w-full sm:w-[75%]">
                <Input value={name.other} onValueChange={(other) => setName((name) => ({ ...name, other }))}>
                  Other name(s)
                </Input>
              </div>
              <div className="grid gap-6 xs:grid-cols-[max-content_minmax(max-content,200px)]">
                <Date value={dob} onValueChange={setDob}>
                  Date of Birth
                </Date>
                <Select required label="Gender" value={gender} onValueChange={setGender}>
                  {teacherGenders.map((gender) => (
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
                  type="email"
                  value={contact.email.primary}
                  onValueChange={(primary) =>
                    setContact((contact) => ({ ...contact, email: { ...contact.email, primary } }))
                  }
                >
                  Email Address
                </Input>
                <Input
                  type="email"
                  value={contact.email.other}
                  onValueChange={(other) =>
                    setContact((contact) => ({ ...contact, email: { ...contact.email, other } }))
                  }
                >
                  Email Address (other)
                </Input>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Phone
                  value={contact.phone?.primary}
                  onValueChange={(primary) =>
                    setContact((contact) => ({ ...contact, phone: { ...(contact.phone ?? {}), primary } }))
                  }
                >
                  Phone Number
                </Phone>
                <Phone
                  value={contact.phone?.other}
                  onValueChange={(other) =>
                    setContact((contact) => ({ ...contact, phone: { ...(contact.phone ?? {}), other } }))
                  }
                >
                  Phone Number (other)
                </Phone>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Textarea
                  value={contact.address?.primary}
                  onValueChange={(primary) =>
                    setContact((contact) => ({ ...contact, address: { ...(contact.address ?? {}), primary } }))
                  }
                >
                  Home Address
                </Textarea>
                <Textarea
                  value={contact.address?.other}
                  onValueChange={(other) =>
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
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Staff Type</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              <RadioGroup value={__type} onValueChange={(v) => setType(v as typeof __type)}>
                <RadioGroup.Item value="teacher">Teacher</RadioGroup.Item>
              </RadioGroup>
            </div>
          </section>

          {__type === "teacher" && (
            <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
              <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
                <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Classes</h3>
                <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
              </div>
              <div className="w-full min-w-0 space-y-7">
                {classes === undefined ? (
                  <button
                    type="button"
                    onClick={() => setClasses([])}
                    className="inline-flex w-full min-w-max max-w-[250px] items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
                  >
                    Load Classes
                  </button>
                ) : (
                  <ClassTeacher selected={classes} updateSelected={setClasses} />
                )}
              </div>
            </section>
          )}
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Profile</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                <Input required value={username} onValueChange={setUsername} autoComplete="off">
                  Username
                </Input>
              </div>
              <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                <Password required value={password} onValueChange={setPassword} autoComplete="new-password">
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
              "Create Staff"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateTeacher;
