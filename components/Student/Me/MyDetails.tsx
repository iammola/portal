import { FunctionComponent } from "react";

const MyDetails: FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-y-4 w-full divide-y-2 border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between w-full">
                <div>
                    <h5 className="text-gray-700 font-medium">Section Title</h5>
                    <p className="text-sm text-gray-500">Section Description</p>
                </div>
                <div className="flex flex-col items-start justify-start gap-y-6 w-full lg:w-[55%] md:w-[65%] px-6 py-8 bg-white rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default MyDetails;
