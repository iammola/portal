import { ComponentProps, FunctionComponent } from "react";

const Form: Form = ({ children, ...props }) => {
  return (
    <form
      {...props}
      className="h-full w-full grow space-y-10 self-center px-10"
    >
      {children}
      <div className="!m-0 flex w-full flex-row items-center justify-end pt-6 pr-10">
        <button
          type="submit"
          className="overflow-hidden rounded-full bg-slate-500 py-2.5 px-8 tracking-wide text-white shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white focus:hover:ring-slate-600 dark:bg-white dark:text-slate-800 dark:hover:bg-slate-100"
        >
          Finish
        </button>
      </div>
    </form>
  );
};

type Form = FunctionComponent<Omit<ComponentProps<"form">, "className">>;

export default Form;
