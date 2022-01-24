import { FunctionComponent, useEffect, useState } from "react";
import { getDaysInMonth } from "date-fns";

import Input from "components/Global/Input";
import { classNames } from "utils";

const DateInput: DateInput = ({ className, onChange, value }) => {
    const [day, setDay] = useState(value?.getDate());
    const [year, setYear] = useState(value?.getFullYear());
    const [month, setMonth] = useState(value === undefined ? undefined : value.getMonth() + 1);

    const [maxDay, setMaxDay] = useState(31);

    useEffect(() => {
        if (month !== undefined)
            setMaxDay(getDaysInMonth(new Date(year ?? new Date().getFullYear(), month - 1)));
    }, [month, year]);

    useEffect(() => {
        if (day !== undefined && month !== undefined && year !== undefined)
            onChange(new Date(year, month - 1, day));
    }, [day, month, onChange, year]);

    const handleChange = (val: number, func: (val?: number) => void) =>
        func(val === 0 ? undefined : val);

    return (
        <div className={className}>
            <div className="w-[4.5rem]">
                <Input.Number
                    id="day"
                    required
                    min={1}
                    max={maxDay}
                    label="Day"
                    value={day}
                    onChange={(val) => handleChange(val, setDay)}
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
            <div className="w-[5rem]">
                <Input.Number
                    required
                    min={1}
                    max={12}
                    id="month"
                    label="Month"
                    value={month}
                    onChange={(val) => handleChange(val, setMonth)}
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
            <div className="w-[6.5rem]">
                <Input.Number
                    min={0}
                    id="year"
                    required
                    max={9999}
                    label="Year"
                    value={year}
                    onChange={(val) => handleChange(val, setYear)}
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
    onChange(val: Date): void;
}>;

export default DateInput;
