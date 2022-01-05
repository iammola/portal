import { FunctionComponent } from "react";

const Password: FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-y-4 w-full divide-y-2 border-gray-200">
            <div>
                <h5 className="text-2xl text-slate-800 font-semibold tracking-wide">Password</h5>
                <p className="text-sm text-gray-500">
                    Please enter your current password to change your password.
                </p>
            </div>
            <div className="grid grid-cols-4 gap-x-20 w-full py-7">
                <h4 className="w-max min-w-max text-sm text-gray-700 font-medium col-start-1 col-end-2">
                    Current password
                </h4>
                <div className="flex flex-col gap-2 items-start justify-start w-[30rem] col-start-2 col-end-4">
                    <input
                        required
                        type="password"
                        className="text-slate-800 text-xl font-extrabold rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none w-full py-3 px-4"
                    />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-x-20 w-full py-7">
                <h4 className="w-max min-w-max text-sm text-gray-700 font-medium col-start-1 col-end-2">
                    New password
                </h4>
                <div className="flex flex-col gap-y-2 items-start justify-start w-[30rem] col-start-2 col-end-4">
                    <input
                        required
                        type="password"
                        className="text-slate-800 text-xl font-extrabold rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none w-full py-3 px-4"
                    />
                    <span className="text-xs text-gray-700 tracking-wide">
                        Your new password must be more than 8 characters.
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-x-20 w-full py-7">
                <h4 className="w-max min-w-max text-sm text-gray-700 font-medium col-start-1 col-end-2">
                    Confirm new password
                </h4>
                <div className="flex flex-col gap-2 items-start justify-start w-[30rem] col-start-2 col-end-4">
                    <input
                        required
                        type="password"
                        className="text-slate-800 text-xl font-extrabold rounded-md shadow shadow-gray-300 transition-shadow focus:ring-2 focus:ring-gray-400 focus:outline-none w-full py-3 px-4"
                    />
                </div>
            </div>
            <div className="flex gap-x-5 items-center justify-end w-full py-7">
                <button
                    type="button"
                    className="text-sm text-slate-800 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-lg py-2.5 px-4"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="text-sm text-white bg-slate-700 hover:bg-slate-800 rounded-lg shadow-lg py-2.5 px-4"
                >
                    Update password
                </button>
            </div>
        </div>
    );
};

export default Password;
