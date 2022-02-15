import { ComponentProps, FunctionComponent } from "react";

const Form: Form = ({ children, ...props }) => {
  return (
    <form
      {...props}
      className="h-full w-full grow space-y-10 self-center px-10"
    >
      {children}
    </form>
  );
};

type Form = FunctionComponent<Omit<ComponentProps<"form">, "className">>;

export default Form;
