import ifEmoji from "if-emoji";
import PhoneNumber from "awesome-phonenumber";
import Flags from "country-flag-icons/react/3x2";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { FunctionComponent, KeyboardEvent, useEffect, useState } from "react";

import { classNames } from "utils";
import Input from "components/Global/Input";

const Field: Field = ({ onChange, value, ...props }) => {
    const defaultRegionCode = "GB";
    const [regionCode, setRegionCode] = useState(
        props.regionCode ??
            (value === undefined ? defaultRegionCode : PhoneNumber(value).getRegionCode())
    );
    const formatter = PhoneNumber.getAsYouType(regionCode);

    const [countryCode, setCountryCode] = useState(
        PhoneNumber.getCountryCodeForRegionCode(regionCode)
    );
    const [valid, setValid] = useState<boolean>();
    const [countryFlag, setCountryFlag] = useState<JSX.Element>();
    const [formattedValue, setFormattedValue] = useState(formatter.reset(value));

    useEffect(() => {
        const regionCode = props.regionCode ?? defaultRegionCode;
        setRegionCode(regionCode);
        setCountryCode(PhoneNumber.getCountryCodeForRegionCode(regionCode));

        const emoji = getUnicodeFlagIcon(regionCode);
        const Icon = Flags[regionCode as keyof typeof Flags] ?? <></>;

        setCountryFlag(
            ifEmoji(emoji) ? <span className="text-xl">{emoji}</span> : <Icon className="w-6 h-7" />
        );
    }, [props.regionCode]);

    function handleChange(tel: string) {
        if (["", "0"].includes(tel) === true) setFormattedValue(formatter.reset(""));
        else setFormattedValue(formatter.reset(`0${tel.replaceAll(" ", "")}`).slice(1));

        const phone = formatter.getPhoneNumber().getNumber("international") ?? "";
        onChange(phone);
        setValid(phone === "" ? undefined : formatter.getPhoneNumber().isValid());
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
        (e.code === "Backspace" || /\d$/.test(e.key) === true) === false && e.preventDefault();

    return (
        <div
            className={classNames(
                "flex flex-row gap-x-3 items-stretch justify-start rounded-xl overflow-hidden bg-white border ring-2",
                {
                    "ring-red-400": valid === false,
                    "ring-transparent": valid === undefined,
                    "focus-within:ring-emerald-400": valid === true,
                }
            )}
        >
            <div className="flex flex-row gap-x-0.5 items-center justify-center px-3.5 py-3 bg-slate-100 hover:bg-slate-200">
                {countryFlag}
                <ChevronUpIcon className="w-6 h-6 fill-slate-600" />
            </div>
            <div className="flex flex-row grow gap-x-2 items-center justify-start">
                <span className="text-lg text-slate-500 font-medium tracking-wide">
                    +{countryCode}
                </span>
                <div className="flex items-center grow w-[12.5rem] h-full">
                    <Input
                        required // overflow-hidden hides the optional text
                        type="tel"
                        value={formattedValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="text-lg text-slate-600 font-semibold grow w-full h-[3.75rem] !px-0 !py-3.5 tracking-wide focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

type Field = FunctionComponent<{
    value: string;
    regionCode?: string;
    onChange(val: string): void;
}>;

export default Field;
