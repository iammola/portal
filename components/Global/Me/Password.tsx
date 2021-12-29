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
        </div>
    );
};

export default Password;
