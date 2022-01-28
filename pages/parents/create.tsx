import Head from "next/head";
import { useState } from "react";

import Input from "components/Global/Input";
import { classNames } from "utils";

import type { NextPage } from "next";
import type { ParentSchema } from "types/schema";

const CreateParent: NextPage = () => {
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState<ParentSchema["dob"]>();
  const [name, setName] = useState<Partial<ParentSchema["name"]>>({});
  const [occupation, setOccupation] = useState<ParentSchema["occupation"]>();
  const [email, setEmail] = useState<Partial<ParentSchema["contact"]["email"]>>(
    {}
  );
  const [phone, setPhone] = useState<Partial<ParentSchema["contact"]["phone"]>>(
    {}
  );
  const [address, setAddress] = useState<
    Partial<ParentSchema["contact"]["address"]>
  >({});

  return (
    <main className="flex h-full min-h-screen w-screen flex-row items-stretch justify-center bg-slate-50 font-poppins dark:bg-slate-900">
      <Head>
        <title>Create Parent | GRIS Portal</title>
        <meta name="description" content="Create parent" />
      </Head>
      <section className="flex w-full grow flex-col items-start justify-start py-10">
        <h1 className="p-10 pt-0 text-5xl font-semibold text-slate-600 dark:text-slate-300">
          <span>Create</span>{" "}
          <span className="bg-gradient-to-br from-indigo-300 to-indigo-600 bg-clip-text text-transparent">
            Parent
          </span>
        </h1>
        <form className="h-full w-full grow space-y-10 self-center px-10">
          <div className="flex w-full items-stretch justify-start rounded-lg bg-white p-7 shadow-md md:gap-x-6 lg:gap-x-12">
            <div className="md:w-[27rem]">
              <h3 className="text-lg font-medium text-slate-800">
                Personal Information
              </h3>
              <p className="text-sm text-slate-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8 xl:w-[40rem]">
              {/* // Todo: Add the select for the title */}
              <Input
                required
                value={name.full}
                type="text"
                id="fullName"
                label="Full name"
                className={(valid?: boolean) =>
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
              <div className="flex w-full flex-row md:gap-x-5 lg:gap-x-7">
                <div className="w-1/2">
                  <Input
                    required
                    value={name.first}
                    type="text"
                    id="firstName"
                    label="First name"
                    className={(valid?: boolean) =>
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
                  <Input
                    required
                    value={name.last}
                    type="text"
                    id="lastName"
                    label="Last name"
                    className={(valid?: boolean) =>
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
                <div className="w-1/3">
                  <Input
                    required
                    value={name.initials}
                    type="text"
                    id="initials"
                    label="Initials"
                    className={(valid?: boolean) =>
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
                <div className="w-2/3">
                  <Input
                    required
                    value={name.other}
                    type="text"
                    id="otherName"
                    label="Other name"
                    className={(valid?: boolean) =>
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
              </div>
              <div className="flex w-full flex-row items-end md:gap-x-5 lg:gap-x-7">
                <div className="w-full grow">
                  <Input
                    required
                    type="text"
                    id="occupation"
                    label="Occupation"
                    value={occupation}
                    onChange={setOccupation}
                    className={(valid?: boolean) =>
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
                  />
                </div>
                <Input.Date className="w-max space-y-3.5">
                  <Input.Date.Label className="text-sm font-medium tracking-wide text-slate-500">
                    Date of Birth
                  </Input.Date.Label>
                  <Input.Date.Field
                    value={dob}
                    onChange={setDOB}
                    className="flex flex-row items-center justify-start gap-x-4"
                  />
                </Input.Date>
              </div>
            </div>
          </div>
          <div className="flex w-full items-stretch justify-start rounded-lg bg-white p-7 shadow-md md:gap-x-6 lg:gap-x-12">
            <div className="md:w-[27rem]">
              <h3 className="text-lg font-medium text-slate-800">Contact</h3>
              <p className="text-sm text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam.
              </p>
            </div>
            <div className="flex w-full flex-col gap-y-8 xl:w-[40rem]">
              <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
                <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
                  Email addresses
                </span>
                <div className="grid w-full grid-cols-4 items-center gap-x-3">
                  <span className="col-start-1 col-end-2 text-sm text-slate-600">
                    Primary
                  </span>
                  <div className="col-start-2 col-end-5">
                    <Input
                      required
                      type="email"
                      value={email.primary}
                      className={(valid?: boolean) =>
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
                <div className="mt-4 grid w-full grid-cols-4 items-center gap-x-3">
                  <span className="col-start-1 col-end-2 text-sm text-slate-600">
                    Work <span className="text-[0.675rem]">(other)</span>
                  </span>
                  <div className="col-start-2 col-end-5">
                    <Input
                      type="email"
                      value={email.other}
                      className={(valid?: boolean) =>
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
                      onChange={(other: string) =>
                        setEmail({ ...email, other })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
                <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
                  Phone numbers
                </span>
                <Input.Phone className="grid w-full grid-cols-4 items-center gap-x-3">
                  <Input.Phone.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                    Primary
                  </Input.Phone.Label>
                  <div className="col-start-2 col-end-5">
                    <Input.Phone.Field
                      required
                      value={phone.primary ?? ""}
                      onChange={(primary) => setPhone({ ...phone, primary })}
                    />
                  </div>
                </Input.Phone>
                <Input.Phone className="mt-4 grid w-full grid-cols-4 items-center gap-x-3">
                  <Input.Phone.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                    Work <span className="text-[0.675rem]">(other)</span>
                  </Input.Phone.Label>
                  <div className="col-start-2 col-end-5">
                    <Input.Phone.Field
                      value={phone.other ?? ""}
                      onChange={(other) => setPhone({ ...phone, other })}
                    />
                  </div>
                </Input.Phone>
              </div>
              <div className="flex w-full flex-col md:gap-y-4 lg:gap-y-8">
                <span className="text-semibold w-full border-b border-slate-400 pb-0.5 text-sm text-slate-800">
                  Address
                </span>
                <Input.Textarea className="grid w-full grid-cols-4 items-center gap-x-3">
                  <Input.Textarea.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                    Home
                  </Input.Textarea.Label>
                  <Input.Textarea.Field
                    required
                    max={500}
                    id="homeAddress"
                    value={address.primary}
                    parentClassName="w-[inherit] h-[inherit] col-start-2 col-end-5"
                    onChange={(primary: string) =>
                      setAddress({ ...address, primary })
                    }
                    className={(valid?: boolean) =>
                      classNames(
                        "h-20 w-full overflow-hidden rounded-lg border border-slate-300 p-3 ring-2 ring-transparent [-webkit-appearance:none] focus:border-transparent focus:outline-none focus:ring-blue-400",
                        {
                          "focus:ring-emerald-400": valid === true,
                          "focus:ring-red-400": valid === false,
                        }
                      )
                    }
                  />
                </Input.Textarea>
                <Input.Textarea className="mt-4 grid w-full grid-cols-4 items-center gap-x-3">
                  <Input.Textarea.Label className="col-start-1 col-end-2 text-sm text-slate-600">
                    Work <span className="text-[0.675rem]">(other)</span>
                  </Input.Textarea.Label>
                  <Input.Textarea.Field
                    max={500}
                    id="workAddress"
                    value={address.other}
                    parentClassName="w-[inherit] h-[inherit] col-start-2 col-end-5"
                    onChange={(other: string) =>
                      setAddress({ ...address, other })
                    }
                    className={(valid?: boolean) =>
                      classNames(
                        "h-20 w-full overflow-hidden rounded-lg border border-slate-300 p-3 ring-2 ring-transparent [-webkit-appearance:none] focus:border-transparent focus:outline-none focus:ring-blue-400",
                        {
                          "focus:ring-emerald-400": valid === true,
                          "focus:ring-red-400": valid === false,
                        }
                      )
                    }
                  />
                </Input.Textarea>
              </div>
            </div>
          </div>
          <div className="flex w-full items-stretch justify-start rounded-lg bg-white p-7 shadow-md md:gap-x-6 lg:gap-x-12">
            <div className="md:w-[27rem]">
              <h3 className="text-lg font-medium text-slate-800">Profile</h3>
              <p className="text-sm text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, eveniet.
              </p>
            </div>
            <div className="flex w-full flex-col gap-y-8 xl:w-[40rem]">
              <div className="w-3/4">
                <Input
                  required
                  type="text"
                  id="userName"
                  label="User name"
                  value={name.username}
                  className={(valid?: boolean) =>
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
              <div className="w-3/4">
                <Input
                  required
                  type="text"
                  id="password"
                  label="Password"
                  value={password}
                  className={(valid?: boolean) =>
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
            </div>
          </div>
        </form>
        <div className="flex w-full flex-row items-center justify-end gap-x-5 p-10 pl-0">
          <button
            type="submit"
            className="rounded-lg bg-indigo-500 py-2.5 px-7 font-medium text-white shadow-sm hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </section>
    </main>
  );
};

export default CreateParent;
