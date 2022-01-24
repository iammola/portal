import { FunctionComponent, useState } from "react";

import Input from "components/Global/Input";
import { classNames } from "utils";

const DateInput: DateInput = ({ className }) => {
    const [day, setDay] = useState<number>();

    return (
        <div className={className}>
            <div className="w-[4.5rem]">
                <Input.Number
                    id="day"
                    required
                    min={1}
                    max={31}
                    label="Day"
                    value={day}
                    onChange={setDay}
                    className={(valid?: boolean) =>
                        classNames(
                            "w-full h-[3.75rem] border placeholder-shown:border-slate-300 focus:border-transparent focus:valid:border-transparent focus:invalid:border-transparent rounded-lg overflow-hidden focus:outline-none ring-2 focus:ring-blue-400 placeholder-shown:ring-transparent placeholder-transparent [-webkit-appearance:none]",
                            {
                                "valid:ring-emerald-400 focus:valid:ring-emerald-400":
                                    valid === true,
                                "invalid:ring-red-400 focus:invalid:ring-red-400": valid === false,
                            }
                        )
                    }
                />
            </div>
        </div>
    );
};

type DateInput = FunctionComponent<{
    min?: Date;
    max?: Date;
    value?: Date;
    className: string;
}>;

export default DateInput;
