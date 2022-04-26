const Password: React.FC = () => {
  return (
    <div className="border-slate-200 flex w-full flex-col gap-y-4 divide-y-2">
      <div>
        <h5 className="text-slate-800 text-2xl font-semibold tracking-wide">Password</h5>
        <p className="text-slate-500 text-sm">Please enter your current password to change your password.</p>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-20 py-7">
        <h4 className="text-slate-700 col-start-1 col-end-2 w-max min-w-max text-sm font-medium">Current password</h4>
        <div className="col-start-2 col-end-4 w-[30rem]">
          <input
            required
            type="password"
            className="text-slate-800 shadow-slate-300 focus:ring-slate-400 w-full rounded-md py-3 px-4 text-xl font-extrabold shadow transition-shadow focus:outline-none focus:ring-2"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-20 py-7">
        <h4 className="text-slate-700 col-start-1 col-end-2 w-max min-w-max text-sm font-medium">New password</h4>
        <div className="col-start-2 col-end-4 flex w-[30rem] flex-col items-start justify-start gap-y-2">
          <input
            required
            type="password"
            className="text-slate-800 shadow-slate-300 focus:ring-slate-400 w-full rounded-md py-3 px-4 text-xl font-extrabold shadow transition-shadow focus:outline-none focus:ring-2"
          />
          <span className="text-slate-700 text-xs tracking-wide">
            Your new password must be more than 8 characters.
          </span>
        </div>
      </div>
      <div className="grid w-full grid-cols-4 gap-x-20 py-7">
        <h4 className="text-slate-700 col-start-1 col-end-2 w-max min-w-max text-sm font-medium">
          Confirm new password
        </h4>
        <div className="col-start-2 col-end-4 w-[30rem]">
          <input
            required
            type="password"
            className="text-slate-800 shadow-slate-300 focus:ring-slate-400 w-full rounded-md py-3 px-4 text-xl font-extrabold shadow transition-shadow focus:outline-none focus:ring-2"
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-x-5 py-7">
        <button
          type="button"
          className="bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg py-2.5 px-4 text-sm shadow-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-800 rounded-lg py-2.5 px-4 text-sm text-white shadow-lg"
        >
          Update password
        </button>
      </div>
    </div>
  );
};

export default Password;
