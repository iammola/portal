import Head from "next/head";
import { useState, useMemo, FormEvent } from "react";

import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";
import * as FormComponents from "components/Form";
import { Form, Section } from "components/Create/User";

import type { NextPage } from "next";
import type { TeacherSchema, UserGender } from "types/schema";
import type {
  CreateTeacherData,
  CreateTeacherRequestBody,
} from "types/api/teachers";

const CreateTeacher: NextPage = () => {
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<string>();
  const [dob, setDOB] = useState<TeacherSchema["dob"]>();
  const [name, setName] = useState<Partial<TeacherSchema["name"]>>({});
  const [image, setImage] = useState<
    Partial<{ [K in "cover" | "portrait"]: string }>
  >({});
  const [email, setEmail] = useState<
    Partial<TeacherSchema["contact"]["email"]>
  >({});
  const [phone, setPhone] = useState<
    Partial<TeacherSchema["contact"]["phone"]>
  >({});
  const [address, setAddress] = useState<
    Partial<TeacherSchema["contact"]["address"]>
  >({});
  const titleOptions = useMemo(
    () => [
      {
        id: "Mr,",
        value: "Mr.",
      },
      {
        id: "Ms.",
        value: "Ms.",
      },
      {
        id: "Mrs.",
        value: "Mrs.",
      },
      {
        id: "Dr.",
        value: "Dr.",
      },
      {
        id: "Barr.",
        value: "Barr.",
      },
    ],
    []
  );
  const genderOptions = useMemo(
    () => [
      {
        id: "M",
        value: "Male",
      },
      {
        id: "F",
        value: "Female",
      },
    ],
    []
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetchAPIEndpoint<CreateTeacherData, CreateTeacherRequestBody>(
        "/api/parents",
        { method: "POST" },
        {
          dob,
          image,
          password,
          contact: {
            email: email as Required<typeof email>,
            phone: phone as Required<typeof phone>,
            address: address as Required<typeof address>,
          },
          gender: gender as UserGender,
          name: name as Required<typeof name>,
        }
      );
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <main className="flex h-full min-h-screen w-screen flex-row items-stretch justify-center bg-slate-50 font-poppins dark:bg-slate-900">
      <Head>
        <title>Create Student | GRIS Portal</title>
        <meta name="description" content="Create student" />
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start py-10">
        <h1 className="p-10 pt-0 text-5xl font-semibold text-slate-600 dark:text-slate-300">
          <span>Create</span>{" "}
          <span className="bg-gradient-to-br from-rose-300 to-rose-600 bg-clip-text text-transparent">
            Teacher
          </span>
        </h1>
        <Form onSubmit={handleSubmit}>
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
                  onChange={({ id }) =>
                    setName((name) => ({ ...name, title: id as string }))
                  }
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
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                        valid === true,
                      "invalid:ring-red-400 focus:invalid:ring-red-400":
                        valid === false,
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                          valid === true,
                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                          valid === false,
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                          valid === true,
                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                          valid === false,
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                          valid === true,
                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                          valid === false,
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                      {
                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                          valid === true,
                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                          valid === false,
                      }
                    )
                  }
                  onChange={(initials: string) =>
                    setName({ ...name, initials })
                  }
                />
              </div>
            </div>
            <div className="flex w-full flex-row items-end md:gap-x-5 lg:gap-x-7">
              <FormComponents.Date className="w-max space-y-3.5">
                <FormComponents.Date.Label className="text-sm font-medium tracking-wide text-slate-500">
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
              <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
                Email addresses
              </span>
              <div className="grid w-full grid-cols-4 items-center gap-x-3">
                <span className="col-start-1 col-end-2 text-sm text-slate-600">
                  Primary
                </span>
                <div className="col-start-2 col-end-5">
                  <FormComponents.Input
                    required
                    type="email"
                    value={email.primary}
                    className={(valid) =>
                      classNames(
                        "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                        {
                          "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                            valid === true,
                          "invalid:ring-red-400 focus:invalid:ring-red-400":
                            valid === false,
                        }
                      )
                    }
                    onChange={(primary: string) =>
                      setEmail({ ...email, primary })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
              <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
                Phone numbers
              </span>
              <FormComponents.Phone className="grid w-full grid-cols-4 items-center gap-x-3">
                <FormComponents.Phone.Label className="col-start-1 col-end-2 text-sm text-slate-600">
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
              <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
                Address
              </span>
              <FormComponents.Textarea className="grid w-full grid-cols-4 items-center gap-x-3">
                <FormComponents.Textarea.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                  Home
                </FormComponents.Textarea.Label>
                <FormComponents.Textarea.Field
                  required
                  max={500}
                  id="homeAddress"
                  value={address.primary}
                  parentClassName="w-[inherit] h-[inherit] col-start-2 col-end-5"
                  onChange={(primary: string) =>
                    setAddress({ ...address, primary })
                  }
                  className={(valid) =>
                    classNames(
                      "h-20 w-full overflow-hidden rounded-lg border border-slate-300 p-3 ring-2 ring-transparent [-webkit-appearance:none] focus:border-transparent focus:outline-none focus:ring-blue-400",
                      {
                        "focus:ring-emerald-400": valid === true,
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
            <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
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
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                        valid === true,
                      "invalid:ring-red-400 focus:invalid:ring-red-400":
                        valid === false,
                    }
                  )
                }
                onChange={(username) => setName({ ...name, username })}
              />
            </div>
            <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
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
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 [-webkit-appearance:none] placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                        valid === true,
                      "invalid:ring-red-400 focus:invalid:ring-red-400":
                        valid === false,
                    }
                  )
                }
                onChange={setPassword}
              />
            </div>
            <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
              Photos
            </span>
            <FormComponents.Avatar
              returnAs="base64"
              value={image.portrait}
              onChange={(portrait) => setImage({ ...image, portrait })}
            />
          </Section>
        </Form>
      </section>
    </main>
  );
};

export default CreateTeacher;
