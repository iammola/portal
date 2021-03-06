import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Fragment, useState } from "react";
import { add, differenceInCalendarWeeks, lightFormat } from "date-fns";
import useSWR from "swr";
import Head from "next/head";
import dynamic from "next/dynamic";

import { fetchAPI } from "api/client";
import { verifyLevel } from "utils/pages";
import { useToast } from "components/Toast";
import { LoadingIcon } from "components/Icons";
import { Date as FormDate, Input, Select } from "components/Form";

import type { GetServerSideProps, NextPage } from "next";

const CreateSession = dynamic(async () => {
  const { CreateSession } = await import("components/Pages/Term");
  return CreateSession;
});

const CreateTerm: NextPage = () => {
  const [newSession, setNewSession] = useState<Record<"long" | "short", string>>();

  const toasts = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [session, setSession] = useState("");
  const [name, setName] = useState({ long: "", short: "" });
  const [start, setStart] = useState<Date | undefined>(add(new Date(), { months: 1 }));
  const [end, setEnd] = useState<Date | undefined>(add(new Date(), { weeks: 1, months: 1 }));

  const [sessions, setSessions] = useState<Array<Record<"_id" | "name", string>>>([]);

  useSWR<API.Result<API.Session.GET.AllData>>("/api/sessions", {
    onSuccess(result) {
      if (!result.success) return;

      const { current, data } = result.data;
      const sessions = data.map((session) => ({
        _id: String(session._id),
        name: session.name.long,
      }));

      setSessions(sessions);
      if (current) setSession(String(current._id));
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!start || !end) return;

    setIsLoading(true);
    const toastID = toasts.add({ kind: "loading", description: "Processing Request..." });

    try {
      const result = await fetchAPI<API.Session.POST.Terms.Data, API.Session.POST.Terms.Body>(
        `/api/sessions/${newSession ? "new" : session}/terms`,
        {
          method: "POST",
          body: Object.assign({ name, end, start }, newSession && { session: { name: newSession } }),
        }
      );

      if (result.success) {
        setStart(new Date());
        setName({ long: "", short: "" });

        toasts.add({ kind: "success", description: "Created Successfully!!" });
      } else throw result.error;
    } catch (error) {
      console.error(error);
      if (typeof error === "string") toasts.add({ kind: "error", description: error });
      if (typeof error === "object") toasts.add({ kind: "error", description: "Couldn't complete request" });
    }

    setIsLoading(false);
    toasts.remove(toastID);
  }

  return (
    <Fragment>
      <Head>
        <title>Create a Term &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Term</h3>
        <form onSubmit={(e) => void handleSubmit(e)} className="w-full max-w-md space-y-10">
          <div className="space-y-5">
            {newSession ? (
              <div className="space-y-2">
                <CreateSession name={newSession} onValueChange={setNewSession} />
                <button
                  type="button"
                  onClick={() => setNewSession(undefined)}
                  className="text-xs text-gray-11 hover:underline hover:underline-offset-1 focus:outline-none dark:text-gray-dark-11"
                >
                  Select session
                </button>
              </div>
            ) : (
              <div className="w-full space-y-2">
                <Select required label="Session" value={session} onValueChange={setSession}>
                  {sessions.map((session) => (
                    <Select.Item key={session._id} value={session._id}>
                      {session.name}
                    </Select.Item>
                  ))}
                </Select>
                <button
                  type="button"
                  onClick={() => setNewSession({ long: "", short: "" })}
                  className="text-xs text-gray-11 hover:underline hover:underline-offset-1 focus:outline-none dark:text-gray-dark-11"
                >
                  Create a new session
                </button>
              </div>
            )}
            <SeparatorPrimitive.Root className="h-px w-full bg-gray-6 dark:bg-gray-dark-6" />
            <div className="space-y-7">
              <div className="flex w-full items-start justify-start gap-3">
                <div className="w-2/3">
                  <Input required value={name.long} onValueChange={(long) => setName((name) => ({ ...name, long }))}>
                    Name
                  </Input>
                </div>
                <div className="w-1/3">
                  <Input required value={name.short} onValueChange={(short) => setName((name) => ({ ...name, short }))}>
                    Alias
                  </Input>
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="flex flex-wrap items-center justify-start gap-2 xs:flex-nowrap">
                  <FormDate required value={start} onValueChange={setStart}>
                    Start Date
                  </FormDate>
                  <FormDate
                    required
                    value={end}
                    onValueChange={setEnd}
                    min={start ? lightFormat(add(start, { weeks: 1 }), "yyyy-MM-dd") : undefined}
                  >
                    End Date
                  </FormDate>
                </div>
                <span className="text-xs font-light tracking-wide text-gray-11 dark:text-gray-dark-11">
                  {(() => {
                    let unit = "week";
                    const weeks = start && end ? differenceInCalendarWeeks(end, start) : 0;
                    if (weeks !== 1) unit += "s";

                    return `${weeks} ${unit} in the time frame above`;
                  })()}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
          >
            {isLoading ? (
              <Fragment>
                <LoadingIcon className="h-[15px] w-[15px] animate-spin" />
                Processing...
              </Fragment>
            ) : (
              "Create Term"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const allowed = await verifyLevel(req, "staff");
  return allowed ? { props: {} } : { notFound: true };
};

export default CreateTerm;
