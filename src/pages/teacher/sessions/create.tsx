import { Fragment, useState } from "react";
import Head from "next/head";

import { useToast } from "components";
import { fetchAPIEndpoint } from "api";
import { Input } from "components/Form";
import { LoadingIcon } from "components/Icons";

import type { NextPage } from "next";

const CreateSession: NextPage = () => {
  const toasts = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState({ long: "", short: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const toastID = toasts.add({ kind: "loading", description: "Processing Request..." });

    try {
      const result = await fetchAPIEndpoint<API.Session.POST.Data, API.Session.POST.Body>("/api/sessions", {
        method: "POST",
        body: { name },
      });

      if (result.success) {
        setName({ long: "", short: "" });
        toasts.add({ kind: "success", description: "Created successfully!!" });
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
        <title>Create a Session &middot; Portal</title>
      </Head>
      <div className="flex w-full grow flex-col items-center justify-center gap-8 py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-12 dark:text-gray-dark-12">Create a Session</h3>
        <form onSubmit={(e) => void handleSubmit(e)} className="w-full max-w-xs space-y-10">
          <div className="space-y-7">
            <Input required value={name.long} onValueChange={(long) => setName((name) => ({ ...name, long }))}>
              Name
            </Input>
            <Input required value={name.short} onValueChange={(short) => setName((name) => ({ ...name, short }))}>
              Alias
            </Input>
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
              "Create Session"
            )}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateSession;
