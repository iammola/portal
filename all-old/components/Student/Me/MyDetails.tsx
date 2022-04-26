const MyDetails: React.FC = () => {
  return (
    <div className="border-slate-200 flex w-full flex-col gap-y-4 divide-y-2">
      <div className="flex w-full flex-col items-start justify-between gap-y-4 pt-8 first:pt-0 first:pb-5 md:flex-row">
        <div>
          <h5 className="text-slate-700 font-medium">Personal info</h5>
          <p className="text-slate-500 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <form className="divide-slate-200 w-full divide-y rounded-lg bg-white shadow-lg md:w-[65%] lg:w-[55%]">
          <div className="flex flex-col items-start justify-start gap-y-6 px-6 pt-8 pb-5">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex w-full grow flex-col gap-2.5">
                <label className="text-slate-500 min-w-max text-[0.8rem] font-medium">First name</label>
                <input
                  required
                  type="text"
                  className="min-w-80 shadow-slate-300 focus:ring-slate-400 rounded-md border py-3 px-4 shadow transition-shadow focus:outline-none focus:ring-2"
                />
              </div>
              <div className="flex w-full grow flex-col gap-2.5">
                <label className="text-slate-500 min-w-max text-[0.8rem] font-medium">Last name</label>
                <input
                  required
                  type="text"
                  className="min-w-80 shadow-slate-300 focus:ring-slate-400 rounded-md border py-3 px-4 shadow transition-shadow focus:outline-none focus:ring-2"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex w-full grow flex-col gap-2.5">
                <label className="text-slate-500 min-w-max text-[0.8rem] font-medium">Other name(s)</label>
                <input
                  required
                  type="text"
                  className="min-w-80 shadow-slate-300 focus:ring-slate-400 rounded-md border py-3 px-4 shadow transition-shadow focus:outline-none focus:ring-2"
                />
              </div>
              <div className="flex grow flex-col gap-2.5">
                <label className="text-slate-500 min-w-max text-[0.8rem] font-medium">Initials</label>
                <input
                  required
                  type="text"
                  className="shadow-slate-300 focus:ring-slate-400 w-40 rounded-md border py-3 px-4 shadow transition-shadow focus:outline-none focus:ring-2"
                />
              </div>
            </div>
            <div className="flex w-full grow flex-col gap-2.5">
              <label className="text-slate-500 min-w-max text-[0.8rem] font-medium">Full name</label>
              <input
                required
                type="text"
                className="min-w-80 shadow-slate-300 focus:ring-slate-400 rounded-md border py-3 px-4 shadow transition-shadow focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              {/* // TODO: Use Select input for Gender field */}
              <div className="flex w-full grow flex-col gap-2.5">
                <label className="text-slate-500 min-w-max text-[0.8rem] font-medium">Gender</label>
                <input
                  required
                  type="text"
                  className="min-w-80 shadow-slate-300 focus:ring-slate-400 rounded-md border py-3 px-4 shadow transition-shadow focus:outline-none focus:ring-2"
                />
              </div>
              {/* // TODO: Use custom Date input for DOB field */}
              <div className="flex grow flex-col gap-2.5">
                <label className="text-slate-500 text-[0.8rem] font-medium xl:min-w-[20rem]">DOB</label>
                <label className="shadow-slate-300 focus-within:ring-purple-400 relative flex w-full items-center justify-start overflow-hidden rounded-md border bg-white pl-3 shadow focus-within:outline-none focus-within:ring-2">
                  <span className="inline-block p-2">
                    <svg
                      aria-hidden={true}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-slate-500 h-5 w-5"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                      />
                    </svg>
                  </span>
                  <input
                    required
                    type="date"
                    className="text-slate-700 grow p-3 focus:outline-none"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-x-5 px-6 py-5">
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
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-y-4 pt-8 first:pt-0 first:pb-5 md:flex-row">
        <div>
          <h5 className="text-slate-700 font-medium">Contacts</h5>
          <p className="text-slate-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
        </div>
        <div className="flex w-full flex-col gap-y-8 md:w-[65%] lg:w-[55%]">
          <form className="divide-slate-200 flex w-full flex-col items-start justify-start gap-y-4 divide-y rounded-lg bg-white pt-8 pb-5 shadow-lg">
            <h4 className="text-slate-700 py-1.5 px-6 font-bold">Email Addresses</h4>
            <div className="flex w-full flex-col items-start justify-center gap-y-4 px-6 pt-5 pb-2">
              <div className="grid w-full grid-cols-4 gap-x-4 py-4">
                <h4 className="text-slate-700 col-start-1 col-end-2 flex w-max min-w-max items-center text-sm font-medium">
                  Primary
                </h4>
                <div className="col-start-2 col-end-5 w-full">
                  <input
                    required
                    type="email"
                    className="text-slate-800 shadow-slate-300 focus:ring-slate-400 w-full rounded-md py-3 px-4 text-xl font-extrabold shadow transition-shadow focus:outline-none focus:ring-2"
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-4 gap-x-4 py-4">
                <h4 className="text-slate-700 col-start-1 col-end-2 flex w-max min-w-max items-center text-sm font-medium">
                  Secondary
                </h4>
                <div className="col-start-2 col-end-5 w-full">
                  <input
                    required
                    type="email"
                    className="text-slate-800 shadow-slate-300 focus:ring-slate-400 w-full rounded-md py-3 px-4 text-xl font-extrabold shadow transition-shadow focus:outline-none focus:ring-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-x-5 px-6 pt-5">
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
                Update
              </button>
            </div>
          </form>
          <form className="divide-slate-200 flex w-full flex-col items-start justify-start gap-y-4 divide-y rounded-lg bg-white pt-8 pb-5 shadow-lg">
            <h4 className="text-slate-700 py-1.5 px-6 font-bold">Phone Numbers</h4>
            <div className="flex w-full flex-col items-start justify-center gap-y-4 px-6 pt-5 pb-2">
              <div className="grid w-full grid-cols-4 gap-x-4 py-4">
                <h4 className="text-slate-700 col-start-1 col-end-2 flex w-max min-w-max items-center text-sm font-medium">
                  Primary
                </h4>
                <div className="col-start-2 col-end-5 w-full">{/* // TODO: Add Custom Phone Number Picker */}</div>
              </div>
              <div className="grid w-full grid-cols-4 gap-x-4 py-4">
                <h4 className="text-slate-700 col-start-1 col-end-2 flex w-max min-w-max items-center text-sm font-medium">
                  Secondary
                </h4>
                <div className="col-start-2 col-end-5 w-full">{/* // TODO: Add Custom Phone Number Picker */}</div>
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-x-5 px-6 pt-5">
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
