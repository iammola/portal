import { Fragment, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { useToast } from "components";
import { fetchAPIEndpoint } from "api";
import { LoadingIcon } from "components/Icons";
import { Date, Input, Password, Phone, Select, Textarea } from "components/Form";

import type { NextPage } from "next";

const ClassTeacher = dynamic(() => import("components/Pages/Teacher").then((_) => _.ClassTeacher));

const CreateStudent: NextPage = () => {
  const toasts = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [teacherGenders] = useState(() => ["Male", "Female"]);
  const [teacherTitles] = useState(() => ["Mr.", "Ms.", "Mrs.", "Dr."]);

  const [dob, setDob] = useState<Date>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [classes, setClasses] = useState<string[]>();
  const [gender, setGender] = useState(teacherTitles[0]);
  const [name, setName] = useState<Schemas.Teacher.Schema["name"]>({
    full: "",
    last: "",
    first: "",
    initials: "",
    title: teacherTitles[0],
  });
  const [contact, setContact] = useState<Schemas.Teacher.Schema["contact"]>({
    email: { primary: "" },
    phone: { primary: "" },
    address: { primary: "" },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let toastID: number;

    try {
      setIsLoading(true);
      toastID = toasts.add({ kind: "loading", description: "Processing request..." });
      const body = { name, contact, dob, username, password, images: {} };
      const result = await fetchAPIEndpoint<API.Teacher.POST.Data, API.Teacher.POST.Body>("/api/teachers", {
        method: "POST",
        body: { ...body, gender: gender[0] },
      });

      setIsLoading(false);
      toasts.remove(toastID);

      if (result.success) {
        setUsername("");
        setPassword("");
        setDob(undefined);
        setGender(teacherGenders[0]);
        setName({ full: "", last: "", first: "", initials: "", title: teacherTitles[0] });
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
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-8">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Teacher Account</h3>
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
                  {teacherTitles.map((title) => (
                    <Select.Item key={title} value={title}>
                      {title}
                    </Select.Item>
                  ))}
                </Select>
                <Input
                  required
                  disabled={isLoading}
                  value={name.full}
                  autoComplete="name"
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
                  disabled={isLoading}
                  value={name.first}
                  autoComplete="given-name"
                  onChange={(first) => setName((name) => ({ ...name, first }))}
                >
                  First name
                </Input>
                <Input
                  required
                  disabled={isLoading}
                  value={name.last}
                  autoComplete="family-name"
                  onChange={(last) => setName((name) => ({ ...name, last }))}
                >
                  Last name
                </Input>
              </div>
              <div className="w-full sm:w-[75%]">
                <Input
                  disabled={isLoading}
                  value={name.other}
                  autoComplete="additional-name"
                  onChange={(other) => setName((name) => ({ ...name, other }))}
                >
                  Other name(s)
                </Input>
              </div>
              <div className="grid gap-6 xs:grid-cols-[max-content_minmax(max-content,200px)]">
                <Date value={dob} disabled={isLoading} onChange={setDob} autoComplete="bday">
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
                  required
                  disabled={isLoading}
                  value={contact.phone.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, phone: { ...contact.phone, primary } }))
                  }
                >
                  Phone Number
                </Phone>
                <Phone
                  disabled={isLoading}
                  value={contact.phone.other}
                  onChange={(other) => setContact((contact) => ({ ...contact, phone: { ...contact.phone, other } }))}
                >
                  Phone Number (other)
                </Phone>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Textarea
                  required
                  disabled={isLoading}
                  value={contact.address.primary}
                  onChange={(primary) =>
                    setContact((contact) => ({ ...contact, address: { ...contact.address, primary } }))
                  }
                >
                  Home Address
                </Textarea>
                <Textarea
                  disabled={isLoading}
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
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Classes</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              {classes === undefined ? (
                <button
                  type="button"
                  disabled={isLoading}
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
          <section className="grid w-full grid-cols-none grid-rows-[max-content_minmax(0,1fr)] gap-6 rounded-lg bg-white p-6 shadow dark:bg-gray-dark-2 md:grid-cols-[max-content_minmax(0,1fr)] md:grid-rows-none">
            <div className="flex w-[12.5rem] min-w-0 flex-col items-start justify-start gap-2">
              <h3 className="text-lg font-medium leading-none text-gray-12 dark:text-gray-dark-12">Profile</h3>
              <p className="text-sm tracking-wide text-gray-11 dark:text-gray-dark-11">Description</p>
            </div>
            <div className="w-full min-w-0 space-y-7">
              <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-2/5">
                <Input required disabled={isLoading} value={username} onChange={setUsername}>
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
              "Create Teacher"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateStudent;
