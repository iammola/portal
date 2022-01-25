import { FunctionComponent } from "react";

const CountrySelect: CountrySelect = () => {
    return (
        <div className="flex flex-col items-start justify-start w-full h-[13.5rem] mt-2 px-2 absolute top-full left-0 rounded-xl shadow-lg overflow-hidden bg-white border border-slate-200 divide-y divide-slate-200">
        </div>
    );
};

type CountrySelect = FunctionComponent;

export default CountrySelect;
