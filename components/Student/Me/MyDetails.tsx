import { FunctionComponent } from "react";

const MyDetails: FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-y-4 w-full divide-y-2 border-gray-200">
            <div className="flex flex-col md:flex-row gap-y-4 items-start justify-between w-full first:pt-0 first:pb-5 pt-8">
                <div>
                    <h5 className="text-gray-700 font-medium">Personal info</h5>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <form className="divide-y divide-gray-200 w-full lg:w-[55%] md:w-[65%] bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-start justify-start gap-y-6 px-6 pt-8 pb-5">
                        <div className="flex items-center justify-between gap-4 w-full">
                            <div className="flex flex-col gap-2.5 w-full flex-grow">
                                <label className="text-[0.8rem] text-gray-500 min-w-max font-medium">
                                    First name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="border rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none min-w-80 py-3 px-4"
                                />
                            </div>
                            <div className="flex flex-col gap-2.5 w-full flex-grow">
                                <label className="text-[0.8rem] text-gray-500 min-w-max font-medium">
                                    Last name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="border rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none min-w-80 py-3 px-4"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4 w-full">
                            <div className="flex flex-col gap-2.5 w-full flex-grow">
                                <label className="text-[0.8rem] text-gray-500 min-w-max font-medium">
                                    Other name(s)
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="border rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none min-w-80 py-3 px-4"
                                />
                            </div>
                            <div className="flex flex-col gap-2.5 flex-grow">
                                <label className="text-[0.8rem] text-gray-500 min-w-max font-medium">
                                    Initials
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="border rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none w-40 py-3 px-4"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5 w-full flex-grow">
                            <label className="text-[0.8rem] text-gray-500 min-w-max font-medium">
                                Full name
                            </label>
                            <input
                                required
                                type="text"
                                className="border rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none min-w-80 py-3 px-4"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4 w-full">
                            {/* // TODO: Use Select input for Gender field */}
                            <div className="flex flex-col gap-2.5 w-full flex-grow">
                                <label className="text-[0.8rem] text-gray-500 min-w-max font-medium">
                                    Gender
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="border rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none min-w-80 py-3 px-4"
                                />
                            </div>
                            {/* // TODO: Use custom Date input for DOB field */}
                            <div className="flex flex-col gap-2.5 flex-grow">
                                <label className="text-[0.8rem] text-gray-500 xl:min-w-[20rem] font-medium">
                                    DOB
                                </label>
                                <label className="relative flex items-center justify-start w-full pl-3 bg-white border overflow-hidden rounded-md shadow shadow-gray-300 focus-within:ring-2 focus-within:ring-purple-400 focus-within:outline-none">
                                    <span className="inline-block p-2">
                                        <svg
                                            aria-hidden={true}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 fill-gray-500"
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
                                        className="flex-grow text-gray-700 p-3 focus:outline-none"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-5 items-center justify-end px-6 py-5 w-full">
                        <button
                            type="button"
                            className="text-sm text-slate-800 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg py-2.5 px-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-sm text-white bg-gray-700 hover:bg-gray-800 rounded-lg shadow-lg py-2.5 px-4"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col md:flex-row gap-y-4 items-start justify-between w-full first:pt-0 first:pb-5 pt-8">
                <div>
                    <h5 className="text-gray-700 font-medium">Contacts</h5>
                    <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipisicing.
                    </p>
                </div>
                <div className="flex flex-col gap-y-5 w-full lg:w-[55%] md:w-[65%]">
                    <form className="flex flex-col items-start justify-start gap-y-6 w-full pt-8 pb-5 bg-white rounded-lg shadow-lg divide-y divide-gray-200">
                        <h4 className="py-1.5 px-6 font-bold text-gray-700">Email Addresses</h4>
                        <div className="flex flex-col gap-y-4 items-start justify-center w-full py-5 px-6">
                            <div className="grid grid-cols-4 gap-x-4 w-full py-4">
                                <h4 className="flex items-center w-max min-w-max text-sm text-gray-700 font-medium col-start-1 col-end-2">
                                    Primary
                                </h4>
                                <div className="w-full col-start-2 col-end-5">
                                    <input
                                        required
                                        type="email"
                                        className="text-slate-800 text-xl font-extrabold rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none w-full py-3 px-4"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-x-4 w-full py-4">
                                <h4 className="flex items-center w-max min-w-max text-sm text-gray-700 font-medium col-start-1 col-end-2">
                                    Secondary
                                </h4>
                                <div className="w-full col-start-2 col-end-5">
                                    <input
                                        required
                                        type="email"
                                        className="text-slate-800 text-xl font-extrabold rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none w-full py-3 px-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyDetails;
