import Head from "next/head";

import Input from "components/Global/Input";
import { classNames } from "utils";

import type { NextPage } from "next";

const CreateParent: NextPage = () => {
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
                                value=""
                                type="text"
                                id="fullName"
                                label="Full name"
                                className={(valid?: boolean) =>
                                    classNames(
                                        "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                        {
                                            "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                valid === true,
                                            "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                valid === false,
                                        }
                                    )
                                }
                                onChange={(v) => console.warn(v)}
                            />
                            <div className="flex flex-row md:gap-x-5 lg:gap-x-7 w-full">
                                <div className="w-1/2">
                                    <Input
                                        required
                                        value=""
                                        type="text"
                                        id="firstName"
                                        label="First name"
                                        className={(valid?: boolean) =>
                                            classNames(
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                {
                                                    "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                        valid === true,
                                                    "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                        valid === false,
                                                }
                                            )
                                        }
                                        onChange={(v) => console.warn(v)}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Input
                                        required
                                        value=""
                                        type="text"
                                        id="lastName"
                                        label="Last name"
                                        className={(valid?: boolean) =>
                                            classNames(
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                {
                                                    "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                        valid === true,
                                                    "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                        valid === false,
                                                }
                                            )
                                        }
                                        onChange={(v) => console.warn(v)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row md:gap-x-5 lg:gap-x-7 w-full">
                                <div className="w-1/3">
                                    <Input
                                        required
                                        value=""
                                        type="text"
                                        id="initials"
                                        label="Initials"
                                        className={(valid?: boolean) =>
                                            classNames(
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                {
                                                    "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                        valid === true,
                                                    "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                        valid === false,
                                                }
                                            )
                                        }
                                        onChange={(v) => console.warn(v)}
                                    />
                                </div>
                                <div className="w-2/3">
                                    <Input
                                        required
                                        value=""
                                        type="text"
                                        id="otherName"
                                        label="Other name"
                                        className={(valid?: boolean) =>
                                            classNames(
                                                "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                {
                                                    "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                        valid === true,
                                                    "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                        valid === false,
                                                }
                                            )
                                        }
                                        onChange={(v) => console.warn(v)}
                                    />
                                </div>
                            </div>
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
                                            value=""
                                            label=""
                                            type="email"
                                            id="primaryEmailAddress"
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(v) => console.warn(v)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full mt-4">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Work <span className="text-[0.675rem]">(other)</span>
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        <Input
                                            value=""
                                            label=""
                                            type="email"
                                            id="workEmailAddress"
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(v) => console.warn(v)}
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
                                            value=""
                                            label=""
                                            type="text"
                                            id="homePhone"
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(v) => console.warn(v)}
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
                                            value=""
                                            label=""
                                            type="text"
                                            id="workPhone"
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(v) => console.warn(v)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:gap-y-4 lg:gap-y-8 w-full">
                                <span className="w-full pb-0.5 text-sm text-semibold text-slate-800 border-b border-slate-400">
                                    Address
                                </span>
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Home
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        {/* // Todo: Replace with actual textarea */}
                                        <Input
                                            required
                                            value=""
                                            label=""
                                            type="text"
                                            id="homeAddress"
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(v) => console.warn(v)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-x-3 items-center w-full mt-4">
                                    <span className="text-sm text-slate-600 col-start-1 col-end-2">
                                        Work <span className="text-[0.675rem]">(other)</span>
                                    </span>
                                    <div className="col-start-2 col-end-5">
                                        {/* // Todo: Replace with actual textarea */}
                                        <Input
                                            value=""
                                            label=""
                                            type="text"
                                            id="workAddress"
                                            className={(valid?: boolean) =>
                                                classNames(
                                                    "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent",
                                                    {
                                                        "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                                            valid === true,
                                                        "invalid:ring-red-400 focus:invalid:ring-red-400":
                                                            valid === false,
                                                    }
                                                )
                                            }
                                            onChange={(v) => console.warn(v)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CreateParent;
