import Head from "next/head";
import { Fragment, useMemo, useState } from "react";

import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";
import * as FormComponents from "all-old/components/Form";
import { Form, Section } from "all-old/components/Create/User";

import type { NextPage } from "next";

const CreateTeacher: NextPage = () => {
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<string>();
  const [dob, setDOB] = useState<Schemas.Teacher.Schema["dob"]>();
  const [name, setName] = useState<Partial<Schemas.Teacher.Schema["name"]>>({});
  const [image, setImage] = useState<Partial<{ [K in "cover" | "portrait"]: string }>>({});
  const [email, setEmail] = useState<Partial<Schemas.Teacher.Schema["contact"]["email"]>>({});
  const [phone, setPhone] = useState<Partial<Schemas.Teacher.Schema["contact"]["phone"]>>({});
  const [address, setAddress] = useState<Partial<Schemas.Teacher.Schema["contact"]["address"]>>({});
  const genderOptions = useMemo(() => ["Male", "Female"].map((value) => ({ id: value[0], value })), []);
  const titleOptions = useMemo(() => ["Mr.", "Ms.", "Mrs.", "Dr.", "Barr."].map((id) => ({ id, value: id })), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetchAPIEndpoint<API.Teacher.POST.Data, API.Teacher.POST.Body>("/api/teachers", {
        method: "POST",
        body: {
          dob,
          image,
          password,
          contact: {
            email: email as Required<typeof email>,
            phone: phone as Required<typeof phone>,
            address: address as Required<typeof address>,
          },
          gender: gender as Schemas.User.Gender,
          name: name as Required<typeof name>,
        },
      });
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Create Teacher | GRIS Portal</title>
        <meta
          name="description"
          content="Create teacher profile"
        />
      </Head>
      <section className="dark:bg-slate-900 flex w-full flex-col items-start justify-start py-10">
        <h1 className="text-slate-600 dark:text-slate-300 p-10 pt-0 text-5xl font-semibold">
          <span>Create</span>{" "}
          <span className="from-rose-300 to-rose-600 bg-gradient-to-br bg-clip-text text-transparent">Teacher</span>
        </h1>
        <Form onSubmit={(e) => void handleSubmit(e)}>
          <Section
            title="Personal Information"
            description="Use a permanent address where you can receive mail."
          >
            <div className="flex w-full flex-row md:gap-x-5 lg:gap-x-7">
              <div className="w-1/4">
                <FormComponents.Select
                  label="Title"
                  options={titleOptions}
                  value={titleOptions.find(({ id }) => id === name.title)}
                  onChange={({ id }) => setName((name) => ({ ...name, title: id as string }))}
                />
              </div>
              <FormComponents.Input
                required
                value={name.full}
                type="text"
                id="fullName"
                label="Full name"
                className={(valid) =>
                  classNames(
                    "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
                onChange={(full: string) => setName({ ...name, full })}
              />
            </div>
            <div className="flex w-full flex-row md:gap-x-5 lg:gap-x-7">
              <div className="w-1/2">
                <FormComponents.Input
                  required
                  value={name.first}
                  type="text"
                  id="firstName"
                  label="First name"
                  className={(valid) =>
                    classNames(
                      "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                        "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                      }
                    )
                  }
                  onChange={(first: string) => setName({ ...name, first })}
                />
              </div>
              <div className="w-1/2">
                <FormComponents.Input
                  required
                  value={name.last}
                  type="text"
                  id="lastName"
                  label="Last name"
                  className={(valid) =>
                    classNames(
                      "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                        "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                      }
                    )
                  }
                  onChange={(last: string) => setName({ ...name, last })}
                />
              </div>
            </div>
            <div className="flex w-full flex-row md:gap-x-5 lg:gap-x-7">
              <div className="w-10/12">
                <FormComponents.Input
                  value={name.other}
                  type="text"
                  id="otherName"
                  label="Other name"
                  className={(valid) =>
                    classNames(
                      "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                        "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                      }
                    )
                  }
                  onChange={(other: string) => setName({ ...name, other })}
                />
              </div>
              <div className="w-2/12">
                <FormComponents.Input
                  required
                  value={name.initials}
                  type="text"
                  id="initials"
                  label="Initials"
                  className={(valid) =>
                    classNames(
                      "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                        "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                      }
                    )
                  }
                  onChange={(initials: string) => setName({ ...name, initials })}
                />
              </div>
            </div>
            <div className="flex w-full flex-row items-end md:gap-x-5 lg:gap-x-7">
              <FormComponents.Date className="w-max space-y-3.5">
                <FormComponents.Date.Label className="text-slate-500 text-sm font-medium tracking-wide">
                  Date of Birth
                </FormComponents.Date.Label>
                <FormComponents.Date.Field
                  value={dob}
                  onChange={setDOB}
                  className="flex flex-row items-center justify-start gap-x-4"
                />
              </FormComponents.Date>
              <FormComponents.Select
                label="Gender"
                options={genderOptions}
                onChange={({ id }) => setGender(id as string)}
                value={genderOptions.find(({ id }) => id === gender)}
              />
            </div>
          </Section>
          <Section
            title="Contact"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam."
          >
            <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
              <span className="text-semibold border-slate-400 text-slate-800 w-full border-b pb-0.5 text-sm">
                Email addresses
              </span>
              <div className="grid w-full grid-cols-4 items-center gap-x-3">
                <span className="text-slate-600 col-start-1 col-end-2 text-sm">Primary</span>
                <div className="col-start-2 col-end-5">
                  <FormComponents.Input
                    required
                    type="email"
                    value={email.primary}
                    className={(valid) =>
                      classNames(
                        "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                        {
                          "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                          "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                        }
                      )
                    }
                    onChange={(primary: string) => setEmail({ ...email, primary })}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
              <span className="text-semibold border-slate-400 text-slate-800 w-full border-b pb-0.5 text-sm">
                Phone numbers
              </span>
              <FormComponents.Phone className="grid w-full grid-cols-4 items-center gap-x-3">
                <FormComponents.Phone.Label className="text-slate-600 col-start-1 col-end-2 text-sm">
                  Primary
                </FormComponents.Phone.Label>
                <div className="col-start-2 col-end-5">
                  <FormComponents.Phone.Field
                    required
                    value={phone.primary ?? ""}
                    onChange={(primary) => setPhone({ ...phone, primary })}
                  />
                </div>
              </FormComponents.Phone>
            </div>
            <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
              <span className="text-semibold border-slate-400 text-slate-800 w-full border-b pb-0.5 text-sm">
                Address
              </span>
              <FormComponents.Textarea className="grid w-full grid-cols-4 items-center gap-x-3">
                <FormComponents.Textarea.Label className="text-slate-600 col-start-1 col-end-2 text-sm">
                  Home
                </FormComponents.Textarea.Label>
                <FormComponents.Textarea.Field
                  required
                  max={500}
                  id="homeAddress"
                  value={address.primary}
                  parentClassName="w-[inherit] h-[inherit] col-start-2 col-end-5"
                  onChange={(primary: string) => setAddress({ ...address, primary })}
                  className={(valid) =>
                    classNames(
                      "border-slate-300 focus:ring-blue-400 h-20 w-full overflow-hidden rounded-lg border p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none",
                      {
                        "focus:ring-emerald-400": valid,
                        "focus:ring-red-400": valid === false,
                      }
                    )
                  }
                />
              </FormComponents.Textarea>
            </div>
          </Section>
          <Section
            title="Profile"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eveniet."
          >
            <span className="text-semibold border-slate-400 text-slate-800 w-full border-b pb-0.5 text-sm">
              Username
            </span>
            <div className="w-3/4">
              <FormComponents.Input
                required
                type="text"
                id="userName"
                label="User name"
                value={name.username}
                className={(valid) =>
                  classNames(
                    "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
                onChange={(username) => setName({ ...name, username })}
              />
            </div>
            <span className="text-semibold border-slate-400 text-slate-800 w-full border-b pb-0.5 text-sm">
              Password
            </span>
            <div className="w-3/4">
              <FormComponents.Password
                required
                withConfirm
                id="password"
                label="Password"
                value={password}
                className={(valid) =>
                  classNames(
                    "placeholder-shown:border-slate-300 focus:ring-blue-400 h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
                onChange={setPassword}
              />
            </div>
            <span className="text-semibold border-slate-400 text-slate-800 w-full border-b pb-0.5 text-sm">Photos</span>
            <FormComponents.Avatar
              returnAs="base64"
              value={image.portrait}
              onChange={(portrait) => setImage({ ...image, portrait })}
            />
          </Section>
        </Form>
      </section>
    </Fragment>
  );
};

export default CreateTeacher;
