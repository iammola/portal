import { FunctionComponent } from "react";

const Form: Form = ({ children }) => {
  return (
    <form className="h-full w-full grow space-y-10 self-center px-10">
      {children}
    </form>
  );
};

type Form = FunctionComponent;

export default Form;
