import { FunctionComponent } from "react";

const MyDetails: FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-y-4 w-full divide-y-2 border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between w-full">
                <div>
                    <h5 className="text-gray-700 font-medium">Personal info</h5>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex flex-col items-start justify-start gap-y-6 w-full lg:w-[55%] md:w-[65%] px-6 py-8 bg-white rounded-lg shadow-lg">
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
                </div>
            </div>
        </div>
    );
};

export default MyDetails;
