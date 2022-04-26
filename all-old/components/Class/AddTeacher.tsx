import { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";

import { fetchAPIEndpoint } from "utils";
import Email, { Value } from "all-old/components/Form/Email";

import type { KeyedMutator } from "swr";

const AddTeacher: React.FC<AddTeacherProps> = ({ id, mutate, show, onClose }) => {
  const [teachers, setTeachers] = useState<Value[]>([]);

  function close() {
    onClose(false);
    setTeachers([]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (teachers.length === 0) return;

    try {
      await fetchAPIEndpoint<API.Class.PUT.Teachers.Data, API.Class.PUT.Teachers.Body>(`api/classes/${id}/teachers`, {
        method: "PUT",
        body: { teachers: teachers.map((t) => t.mail) },
      });
      await mutate().then(close);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return (
    <Transition
      show={show}
      as={Fragment}
    >
      <Dialog
        as="aside"
        onClose={close}
        className="fixed inset-0 z-[100] flex items-center justify-center font-urbane"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="relative flex w-full max-w-lg flex-col items-center justify-start gap-y-10 rounded-3xl bg-white p-6"
          >
            <Dialog.Title className="text-slate-500 text-3xl font-medium tracking-wide">Add Teachers</Dialog.Title>
            <Email className="w-full space-y-2">
              <Email.Label className="text-slate-600 text-sm tracking-wide ">
                Use the teachers email address (teacher@grs.io)
              </Email.Label>
              <Email.Field
                values={teachers}
                userType="teacher"
                onChange={setTeachers}
                className="border-slate-300 focus:ring-slate-400 flex w-full grow flex-row flex-wrap items-center justify-start gap-x-3 gap-y-2 rounded-lg border bg-white px-3 py-[17px] ring-2 ring-white ring-offset-2 ring-offset-white focus:outline-none"
              />
            </Email>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 focus-visible:ring-gray-600 rounded-full px-6 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={close}
              className="hover:bg-slate-500 group absolute right-5 top-5 rounded-full p-2"
            >
              <XIcon className="fill-gray-500 group-hover:fill-gray-200 h-5 w-5" />
            </button>
          </form>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

interface AddTeacherProps {
  id: string;
  show: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  onClose(v: boolean): void;
}

export default AddTeacher;
