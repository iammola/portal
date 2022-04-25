import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

export const Delete: React.FC<DeleteProps> = ({ close, show, ...props }) => {
  return (
    <Transition
      show={show}
      as={Fragment}
    >
      <Dialog
        onClose={close}
        className="fixed inset-0 z-10 flex h-screen w-full items-center justify-center"
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
          <Dialog.Overlay className="fixed inset-0 h-full w-full bg-black/30" />
        </Transition.Child>
        <Transition.Child
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="m-2 flex transform flex-col gap-1.5 overflow-hidden rounded-2xl bg-white py-6 px-10 shadow-xl transition-all md:w-[57.5vw] lg:w-[50vw] xl:w-[42.5vw]"
        >
          <Dialog.Title className="border-b-2 border-gray-100 pb-2 text-lg font-medium tracking-wide text-gray-700">
            Are you sure you want to delete this class?
          </Dialog.Title>
          <div className="item-center mt-2 flex justify-end gap-5">
            <button
              type="button"
              onClick={props.delete}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-xs font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Yes I&apos;m sure
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

interface DeleteProps {
  show: boolean;
  close(): void;
  delete(this: void): void;
}
