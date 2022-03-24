import { Fragment, FunctionComponent } from "react";
import { Dialog, Transition } from "@headlessui/react";

const AddTeacher: FunctionComponent<AddTeacherProps> = ({ show, onClose }) => {
  return (
    <Transition
      show={show}
      as={Fragment}
    >
      <Dialog
        as="aside"
        onClose={onClose}
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
          <Dialog.Overlay />
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
          <form />
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

interface AddTeacherProps {
  show: boolean;
  onClose(v: boolean): void;
}

export default AddTeacher;
