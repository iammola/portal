import useSWR from "swr";
import Head from "next/head";
import { Fragment, useState } from "react";

import { Select } from "components/Form/Select";

import type { NextPage } from "next";

const Timetable: NextPage = () => {
  const [active, setActive] = useState<Record<"class" | "term", string>>({ class: "", term: "" });

  const [classes, setClasses] = useState<Array<Record<"_id" | "name", string>>>();
  const [terms, setTerms] = useState<Array<{ session: string; terms: Array<Record<"_id" | "name", string>> }>>();

  useSWR<API.Result<API.Class.GET.AllData>>("/api/classes", {
    onSuccess(result) {
      if (!result.success) return;
      setClasses(
        result.data.map((item) => ({
          _id: String(item._id),
          name: item.name.long,
        }))
      );
    },
  });

  useSWR<API.Result<API.Term.GET.AllData>>("/api/terms", {
    onSuccess(result) {
      if (!result.success) return;
      const { current, data } = result.data;

      setTerms(
        data.map(({ session, terms }) => ({
          session: session.name.long,
          terms: terms.map((term) => ({
            _id: String(term._id),
            name: term.name.long,
          })),
        }))
      );

      if (current && !active.term)
        setActive({
          ...active,
          term: String(current._id),
        });
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Timetable &middot; Portal</title>
      </Head>
      <div className="flex h-full flex-col items-start justify-start gap-5 p-8">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-4xl font-bold text-gray-12 dark:text-gray-dark-12">Timetable</h3>
          <div className="flex items-center justify-center gap-4">
            <Select
              required
              label="Class"
              value={active.class}
              onValueChange={(val) => setActive((active) => ({ ...active, class: val }))}
            >
              {!active.class && (
                <Select.Item disabled value="">
                  Select a Class
                </Select.Item>
              )}
              {classes?.map((item) => (
                <Select.Item key={item._id} value={item._id}>
                  {item.name}
                </Select.Item>
              ))}
            </Select>
            <Select
              required
              label="Term"
              value={active.term}
              onValueChange={(term) => setActive((active) => ({ ...active, term }))}
            >
              {!active.term && (
                <Select.Item disabled value="">
                  Select a Term
                </Select.Item>
              )}
              {terms?.map(({ session, terms }) => (
                <Fragment key={session}>
                  <span className="text-xs font-medium text-gray-11 dark:text-gray-dark-11">{session}</span>
                  {terms.map((term) => (
                    <Select.Item key={term._id} value={term._id}>
                      {term.name}
                    </Select.Item>
                  ))}
                </Fragment>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Timetable;