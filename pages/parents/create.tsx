import Head from "next/head";
import { useState } from "react";

import Input from "components/Global/Input";
import { classNames } from "utils";

import type { NextPage } from "next";
import type { ParentSchema } from "types/schema";

const CreateParent: NextPage = () => {
    const [dob, setDOB] = useState<ParentSchema["dob"]>();
    const [name, setName] = useState<Partial<ParentSchema["name"]>>({});
    const [email, setEmail] = useState<Partial<ParentSchema["contact"]["email"]>>({});
    const [phone, setPhone] = useState<Partial<ParentSchema["contact"]["phone"]>>({});
    const [address, setAddress] = useState<Partial<ParentSchema["contact"]["address"]>>({});

    return (
        <main className="flex flex-row items-stretch justify-center w-screen h-full min-h-screen bg-slate-50 dark:bg-slate-900 font-poppins">
            <Head>
                <title>Create Parent | GRIS Portal</title>
                <meta name="description" content="Create parent" />
            </Head>
            <section className="flex flex-col items-start justify-start grow w-full py-10">
                <h1 className="text-5xl font-semibold text-slate-600 dark:text-slate-300 p-10 pt-0">
                    <span>Create</span>{" "}
                    <span className="bg-clip-text bg-gradient-to-br from-indigo-300 to-indigo-600 text-transparent">
                        Parent
                    </span>
                </h1>
                <div className="w-full h-full grow self-center px-10 space-y-10">
                    <div className="flex items-stretch justify-start md:gap-x-6 lg:gap-x-12 w-full p-7 bg-white shadow-md rounded-lg">
                        <div className="md:w-[27rem]">
                            <h3 className="text-lg text-slate-800 font-medium">
                                Personal Information
                            </h3>
                            <p className="text-sm text-slate-500">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>
                        <div className="flex flex-col md:gap-y-4 lg:gap-y-8 w-full xl:w-[40rem]">
                            {/* // Todo: Add the select for the title */}
                            <Input
                                required
                                value={name.full}
                                type="text"
                                id="fullName"
                                label="Full name"
                                className={(valid?: boolean) =>
                                    classNames(
                                        "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                            <div className="flex flex-row md:gap-x-5 lg:gap-x-7 w-full">
                                <div className="w-1/2">
                                    <Input
                                        required
                                        value={name.first}
                                        type="text"
                                        id="firstName"
                                        label="First name"
                                        className={(valid?: boolean) =>
                                            classNames(
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                            <div className="flex flex-row md:gap-x-5 lg:gap-x-7 w-full">
                                <div className="w-1/3">
                                    <Input
                                        required
                                        value={name.initials}
                                        type="text"
                                        id="initials"
                                        label="Initials"
                                        className={(valid?: boolean) =>
                                            classNames(
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                            <Input.Date className="space-y-3.5">
                                <Input.Date.Label className="text-sm font-medium text-slate-500 tracking-wide">
                                    Date of Birth
                                </Input.Date.Label>
                                <Input.Date.Field
                                    value={dob}
                                    onChange={setDOB}
                                    className="flex flex-row gap-x-4 items-center justify-start"
                                />
                            </Input.Date>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-start md:gap-x-6 lg:gap-x-12 w-full p-7 bg-white shadow-md rounded-lg">
                        <div className="md:w-[27rem]">
                            <h3 className="text-lg text-slate-800 font-medium">Contact</h3>
                            <p className="text-sm text-slate-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam.
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-8 w-full xl:w-[40rem]">
                            <div className="flex flex-col md:gap-y-4 lg:gap-y-8 w-full">
                                <span className="w-full pb-0.5 text-sm text-semibold text-slate-800 border-b border-slate-400">
                                    Email addresses
                                </span>
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Primary
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        <Input
                                            required
                                            type="email"
                                            value={email.primary}
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full mt-4">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Work <span className="text-[0.675rem]">(other)</span>
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        <Input
                                            type="email"
                                            value={email.other}
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
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
                            <div className="flex flex-col md:gap-y-4 lg:gap-y-8 w-full">
                                <span className="w-full pb-0.5 text-sm text-semibold text-slate-800 border-b border-slate-400">
                                    Phone numbers
                                </span>
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Primary
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        {/* // Todo: Replace with phone number switcher */}
                                        <Input
                                            required
                                            type="text"
                                            value={phone.primary}
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(primary: string) =>
                                                setPhone({ ...phone, primary })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full mt-4">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Work <span className="text-[0.675rem]">(other)</span>
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        {/* // Todo: Replace with phone number switcher */}
                                        <Input
                                            type="text"
                                            value={phone.other}
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(other: string) =>
                                                setPhone({ ...phone, other })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:gap-y-4 lg:gap-y-8 w-full">
                                <span className="w-full pb-0.5 text-sm text-semibold text-slate-800 border-b border-slate-400">
                                    Address
                                </span>
                                <Input.Textarea className="grid grid-cols-4 gap-x-3 items-center w-full">
                                    <Input.Textarea.Label className="text-sm text-slate-600 col-start-1 col-end-2">
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
                                                "w-full h-20 p-3 border border-slate-300 focus:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-blue-400 [-webkit-appearance:none]",
                                                {
                                                    "focus:ring-emerald-400": valid === true,
                                                    "focus:ring-red-400": valid === false,
                                                }
                                            )
                                        }
                                    />
                                </Input.Textarea>
                                <Input.Textarea className="grid grid-cols-4 gap-x-3 items-center w-full mt-4">
                                    <Input.Textarea.Label className="text-sm text-slate-600 col-start-1 col-end-2">
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
                                                "w-full h-20 p-3 border border-slate-300 focus:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 ring-transparent focus:ring-blue-400 [-webkit-appearance:none]",
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
                </div>
            </section>
        </main>
    );
};

export default CreateParent;
