import { Fragment, useState } from "react";
import useSWR from "swr";
import Head from "next/head";

import { Checkbox, Input, Select } from "components/Form";

import type { NextPage } from "next";

const CreateTerm: NextPage = () => {
  const [session, setSession] = useState("");
  const [current, setCurrent] = useState(false);
  const [name, setName] = useState({ long: "", short: "" });

  const [sessions, setSessions] = useState<Array<Record<"_id" | "name", string>>>([]);

  useSWR<API.Result<API.Session.GET.AllData>>("/api/sessions", {
    onSuccess(result) {
      if (!result.success) return;

      const sessions = result.data.map((session) => ({
        _id: String(session._id),
        name: session.name.long,
      }));

      setSessions(sessions);
      setSession((session) => String(result.data.find((session) => session.current)?._id ?? session));
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Create a Term &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Term</h3>
        <form className="w-full max-w-xs space-y-10">
          <div className="space-y-7">
            <Select required label="Session" value={session} onValueChange={setSession}>
              {sessions.map((session) => (
                <Select.Item key={session._id} value={session._id}>
                  {session.name}
                </Select.Item>
              ))}
            </Select>
            <div className="flex w-full items-start justify-start gap-3">
              <div className="w-2/3">
                <Input required value={name.long} onChange={(long) => setName((name) => ({ ...name, long }))}>
                  Name
                </Input>
              </div>
              <div className="w-1/3">
                <Input required value={name.short} onChange={(short) => setName((name) => ({ ...name, short }))}>
                  Alias
                </Input>
              </div>
            </div>
            <Checkbox checked={current} onCheckedChange={(c) => setCurrent(c as boolean)}>
              Mark as current term?
            </Checkbox>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-black-a-9 p-3 text-white shadow-lg hover:bg-black-a-10 focus:outline-none disabled:text-white-a-12 dark:text-gray-dark-12 dark:disabled:text-gray-dark-11"
          >
            Create Term
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateTerm;
