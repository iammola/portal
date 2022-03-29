import { FunctionComponent, FormEvent, useState } from "react";

import { classNames, fetchAPIEndpoint } from "utils";
import { Input, Email } from "components/Form";

import type { Value as EmailValue } from "components/Form/Email";
import type { CreateClassData, CreateClassRequestBody } from "types/api/classes";

export const Create: FunctionComponent = () => {
  const [long, setLong] = useState("");
  const [short, setShort] = useState("");
  const [special, setSpecial] = useState("");
  const [teachers, setTeachers] = useState<EmailValue[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const result = await fetchAPIEndpoint<CreateClassData, CreateClassRequestBody>("/api/classes", {
        method: "POST",
        body: {
          name: { long, short, special },
          teachers: teachers.map((t) => t.mail),
        },
      });

      if (result.success) {
        setLong("");
        setShort("");
        setSpecial("");
        setTeachers([]);
        console.warn(result.message, result.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-full items-start justify-center px-6 py-10">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="w-[35rem] space-y-10 rounded-2xl bg-white px-10 py-8 shadow-lg"
      >
        <div className="space-y-8">
          <Input
            required
            id="name"
            type="text"
            value={long}
            label="Class name"
            onChange={setLong}
            className={(valid) =>
              classNames(
                "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                {
                  "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                  "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                }
              )
            }
          />
          <div className="flex w-full flex-row md:gap-x-3 lg:gap-x-5">
            <div className="w-1/3">
              <Input
                required
                id="alias"
                type="text"
                value={short}
                label="Class alias"
                onChange={setShort}
                className={(valid) =>
                  classNames(
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
              />
            </div>
            <div className="w-2/3">
              <Input
                required
                id="special"
                type="text"
                value={special}
                onChange={setSpecial}
                label="Class special name"
                className={(valid) =>
                  classNames(
                    "h-[3.75rem] w-full overflow-hidden rounded-lg border border-transparent placeholder-transparent ring-2 placeholder-shown:border-slate-300 placeholder-shown:ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400 focus:valid:border-transparent focus:invalid:border-transparent",
                    {
                      "valid:ring-emerald-400 focus:valid:ring-emerald-400": valid,
                      "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                    }
                  )
                }
              />
            </div>
          </div>
          <Email className="relative w-full">
            <Email.Field
              values={teachers}
              userType="teacher"
              onChange={setTeachers}
              className="peer flex w-full grow flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 rounded-lg border border-slate-300 bg-white px-3 py-[17px] ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
            />
            <Email.Label className="absolute left-3 -top-3 bg-white p-1 text-xs tracking-normal text-slate-600 transition-all peer-empty:top-1/2 peer-empty:-translate-y-1/2 peer-empty:text-sm peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs">
              Teachers
            </Email.Label>
          </Email>
        </div>
        <button
          type="submit"
          className="mt-5 w-full overflow-hidden rounded-lg bg-emerald-500 py-3 px-5 font-bold uppercase tracking-wide text-white shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white focus:hover:ring-emerald-600"
        >
          Finish
        </button>
      </form>
    </div>
  );
};
