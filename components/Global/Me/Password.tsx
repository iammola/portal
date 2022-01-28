import { FunctionComponent } from "react";

const Password: FunctionComponent = () => {
  return (
    <div className="flex w-full flex-col gap-y-4 divide-y-2 border-slate-200">
      <div>
        <h5 className="text-2xl font-semibold tracking-wide text-slate-800">
          Password
        </h5>
        <p className="text-sm text-slate-500">
          Please enter your current password to change your password.
        </p>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-20 py-7">
        <h4 className="col-start-1 col-end-2 w-max min-w-max text-sm font-medium text-slate-700">
          Current password
        </h4>
        <div className="col-start-2 col-end-4 w-[30rem]">
          <input
            required
            type="password"
            className="w-full rounded-md py-3 px-4 text-xl font-extrabold text-slate-800 shadow shadow-slate-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-20 py-7">
        <h4 className="col-start-1 col-end-2 w-max min-w-max text-sm font-medium text-slate-700">
          New password
        </h4>
        <div className="col-start-2 col-end-4 flex w-[30rem] flex-col items-start justify-start gap-y-2">
          <input
            required
            type="password"
            className="w-full rounded-md py-3 px-4 text-xl font-extrabold text-slate-800 shadow shadow-slate-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <span className="text-xs tracking-wide text-slate-700">
            Your new password must be more than 8 characters.
          </span>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-20 py-7">
        <h4 className="col-start-1 col-end-2 w-max min-w-max text-sm font-medium text-slate-700">
          Confirm new password
        </h4>
        <div className="col-start-2 col-end-4 w-[30rem]">
          <input
            required
            type="password"
            className="w-full rounded-md py-3 px-4 text-xl font-extrabold text-slate-800 shadow shadow-slate-300 transition-shadow focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-x-5 py-7">
        <button
          type="button"
          className="rounded-lg bg-slate-100 py-2.5 px-4 text-sm text-slate-800 shadow-lg hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-slate-700 py-2.5 px-4 text-sm text-white shadow-lg hover:bg-slate-800"
        >
          Update password
        </button>
      </div>
    </div>
  );
};

export default Password;
