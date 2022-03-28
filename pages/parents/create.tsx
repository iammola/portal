import Head from "next/head";
import { Fragment, FormEvent, useState, useMemo } from "react";

import { classNames } from "utils";
import { fetchAPIEndpoint } from "utils/api";
import * as FormComponents from "components/Form";
import { Form, Section } from "components/Create/User";

import type { NextPage } from "next";
import type { ParentSchema, UserGender } from "types/schema";
import type { CreateParentData, CreateParentRequestBody } from "types/api/parents";

const CreateParent: NextPage = () => {
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<string>();
  const [dob, setDOB] = useState<ParentSchema["dob"]>();
  const [name, setName] = useState<Partial<ParentSchema["name"]>>({});
  const [image, setImage] = useState<Partial<{ [K in "cover" | "portrait"]: string }>>({});
  const [occupation, setOccupation] = useState<ParentSchema["occupation"]>();
  const [email, setEmail] = useState<Partial<ParentSchema["contact"]["email"]>>({});
  const [phone, setPhone] = useState<Partial<ParentSchema["contact"]["phone"]>>({});
  const [address, setAddress] = useState<Partial<ParentSchema["contact"]["address"]>>({});
  const genderOptions = useMemo(() => ["Male", "Female"].map((value) => ({ id: value[0], value })), []);
  const titleOptions = useMemo(() => ["Mr.", "Ms.", "Mrs.", "Dr.", "Barr."].map((id) => ({ id, value: id })), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await fetchAPIEndpoint<CreateParentData, CreateParentRequestBody>("/api/parents", {
        method: "POST",
        body: {
          dob,
          image,
          password,
          occupation: occupation as string,
          contact: {
            email: email as Required<typeof email>,
            phone: phone as Required<typeof phone>,
            address: address as Required<typeof address>,
          },
          gender: gender as UserGender,
          name: name as Required<typeof name>,
        },
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Create Parent | GRIS Portal</title>
        <meta
          name="description"
          content="Create parent"
        />
      </Head>
      <section className="flex w-full flex-col items-start justify-start py-10 dark:bg-slate-900">
        <h1 className="p-10 pt-0 text-5xl font-semibold text-slate-600 dark:text-slate-300">
          <span>Create</span>{" "}
          <span className="bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">Parent</span>
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
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
                      "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
            <div className="w-3/4">
              <FormComponents.Input
                required
                type="text"
                id="occupation"
                label="Occupation"
                value={occupation}
                onChange={setOccupation}
                className={(valid) =>
                  classNames(
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
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
                <span className="col-start-1 col-end-2 text-sm text-slate-600">Primary</span>
                <div className="col-start-2 col-end-5">
                  <FormComponents.Input
                    required
                    type="email"
                    value={email.primary}
                    className={(valid) =>
                      classNames(
                        "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
              <div className="mt-4 grid w-full grid-cols-4 items-center gap-x-3">
                <span className="col-start-1 col-end-2 text-sm text-slate-600">
                  Work <span className="text-[0.675rem]">(other)</span>
                </span>
                <div className="col-start-2 col-end-5">
                  <FormComponents.Input
                    type="email"
                    value={email.other}
                    className={(valid) =>
                      classNames(
                        "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
                        {
                          "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                          "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                        }
                      )
                    }
                    onChange={(other: string) => setEmail({ ...email, other })}
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
              <FormComponents.Phone className="mt-4 grid w-full grid-cols-4 items-center gap-x-3">
                <FormComponents.Phone.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                  Work <span className="text-[0.675rem]">(other)</span>
                </FormComponents.Phone.Label>
                <div className="col-start-2 col-end-5">
                  <FormComponents.Phone.Field
                    value={phone.other ?? ""}
                    onChange={(other) => setPhone({ ...phone, other })}
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
                  onChange={(primary: string) => setAddress({ ...address, primary })}
                  className={(valid) =>
                    classNames(
                      "h-20 w-full overflow-hidden rounded-lg border border-slate-300 p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
                      {
                        "focus:ring-emerald-400": valid,
                        "focus:ring-red-400": valid === false,
                      }
                    )
                  }
                />
              </FormComponents.Textarea>
              <FormComponents.Textarea className="mt-4 grid w-full grid-cols-4 items-center gap-x-3">
                <FormComponents.Textarea.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                  Work <span className="text-[0.675rem]">(other)</span>
                </FormComponents.Textarea.Label>
                <FormComponents.Textarea.Field
                  max={500}
                  id="workAddress"
                  value={address.other}
                  parentClassName="w-[inherit] h-[inherit] col-start-2 col-end-5"
                  onChange={(other: string) => setAddress({ ...address, other })}
                  className={(valid) =>
                    classNames(
                      "h-20 w-full overflow-hidden rounded-lg border border-slate-300 p-3 ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
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
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
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
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent valid:border-transparent focus:border-transparent focus:outline-none focus:ring-blue-400",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
                onChange={setPassword}
              />
            </div>
            <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">Photos</span>
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

export default CreateParent;
