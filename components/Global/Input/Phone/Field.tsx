import PhoneNumber from "awesome-phonenumber";
import { ChevronUpIcon } from "@heroicons/react/solid";
import {
    FocusEvent,
    FunctionComponent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { classNames } from "utils";
import { useCountryFlag } from "hooks";
import Input from "components/Global/Input";

import CountrySelect from "./CountrySelect";

const Field: Field = ({ onChange, value, ...props }) => {
    const defaultRegionCode = "GB";
    const [valid, setValid] = useState<boolean>();
    const [regionCode, setRegionCode] = useState(
        props.regionCode ??
            (value === undefined ? defaultRegionCode : PhoneNumber(value).getRegionCode())
    );
    const [showCountrySelect, setShowCountrySelect] = useState(false);

    const countryFlag = useCountryFlag(regionCode);
    const formatter = useMemo(() => PhoneNumber.getAsYouType(regionCode), [regionCode]);
    const [countryCode, setCountryCode] = useState(
        PhoneNumber.getCountryCodeForRegionCode(regionCode)
    );
    const [formattedValue, setFormattedValue] = useState(
        formatter.reset(PhoneNumber(value).getNumber("significant"))
    );

    const handleChange = useCallback(
        (tel: string) => {
            if (["", "0"].includes(tel) === true) setFormattedValue(formatter.reset(""));
            else setFormattedValue(formatter.reset(`0${tel.replaceAll(" ", "")}`).slice(1));

            const phone = formatter.getPhoneNumber().getNumber("international") ?? "";
            onChange(phone);
            setValid(phone === "" ? undefined : formatter.getPhoneNumber().isValid());
        },
        [formatter, onChange]
    );
    const handleRegionChange = useCallback((regionCode: string = defaultRegionCode) => {
        setRegionCode(regionCode);
        setCountryCode(PhoneNumber.getCountryCodeForRegionCode(regionCode));
    }, []);

    useEffect(() => handleChange(formatter.number()), [formatter, handleChange]);
    useEffect(() => handleRegionChange(props.regionCode), [handleRegionChange, props.regionCode]);

    const handleFocus = (e: FocusEvent<HTMLElement>) => {
        const target = (e.type === "focus" ? e.target : e.relatedTarget) as HTMLElement | null;
        setShowCountrySelect(!!e.target.parentElement?.contains(target));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
        (e.code === "Backspace" || /\d$/.test(e.key) === true) === false && e.preventDefault();

    return (
        <div
            className={classNames(
                "flex flex-row gap-x-3 items-stretch justify-start rounded-xl bg-white border border-slate-200 ring-2 relative w-full",
                {
                    "ring-red-400": valid === false,
                    "ring-transparent": valid === undefined,
                    "focus-within:ring-emerald-400": valid === true,
                }
            )}
        >
            <div className="flex flex-row gap-x-0.5 items-center justify-center px-3.5 py-3 rounded-l-xl bg-slate-100 hover:bg-slate-200">
                {countryFlag}
                <ChevronUpIcon className="w-6 h-6 fill-slate-600" />
            </div>
            <div className="flex flex-row grow gap-x-2 items-center justify-start rounded-r-xl">
                <span className="text-lg text-slate-500 font-medium tracking-wide">
                    +{countryCode}
                </span>
                <div className="flex items-center grow w-[12.5rem] h-full rounded-r-xl">
                    <Input
                        type="tel"
                        value={formattedValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="text-lg text-slate-600 font-semibold grow w-full h-[3.75rem] !px-0 !py-3.5 tracking-wide focus:outline-none rounded-r-xl"
                    />
                </div>
            </div>
            <CountrySelect
                onRegionChange={handleRegionChange}
                selectedRegion={regionCode}
                className="flex flex-col items-start justify-start w-full h-[13.5rem] mt-2 px-2 absolute top-full left-0 rounded-xl shadow-lg overflow-hidden bg-white border border-slate-200 divide-y divide-slate-200"
            />
        </div>
    );
};

type Field = FunctionComponent<{
    value: string;
    regionCode?: string;
    onChange(val: string): void;
}>;

export default Field;
