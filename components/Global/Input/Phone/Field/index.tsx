import { ChevronUpIcon } from "@heroicons/react/solid";
import { FunctionComponent, useState } from "react";

import Input from "components/Global/Input";

const Field: Field = () => {
    const [value, setValue] = useState("7400 123456");

    return (
        <div className="flex flex-row gap-x-3 items-stretch justify-start rounded-xl overflow-hidden bg-white border">
            <div className="flex flex-row gap-x-0.5 items-center justify-center px-3.5 py-3 bg-slate-100 hover:bg-slate-200">
                <span className="text-xl">🇬🇧</span>
                <ChevronUpIcon className="w-6 h-6 fill-slate-600" />
            </div>
            <div className="flex flex-row grow gap-x-2 items-center justify-start">
                <span className="text-lg text-slate-500 font-medium tracking-wide">+44</span>
                <div className="flex items-center grow w-[12.5rem] h-full">
                    <Input
                        required // overflow-hidden hides the optional text
                        type="tel"
                        value={value}
                        onChange={(tel) => setValue(tel as string)}
                        className="text-lg text-slate-600 font-semibold grow w-full h-[3.75rem] !px-0 !py-3.5 tracking-wide"
                    />
                </div>
            </div>
        </div>
    );
};

type Field = FunctionComponent<{
    value: string;
    className: string;
    regionCode?: string;
    onChange(val: string): void;
}>;

export default Field;
