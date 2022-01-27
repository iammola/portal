import PhoneNumber from "awesome-phonenumber";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { FormEvent, FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";

import { classNames } from "utils";
import { useCountryFlag } from "hooks";
import Input from "components/Global/Input";

import RegionSelect from "./RegionSelect";

const Field: Field = ({ onChange, required, value = "", ...props }) => {
    const defaultRegionCode = "GB";
    const [valid, setValid] = useState<boolean>();
    const [regionCode, setRegionCode] = useState("");
    const [countryCode, setCountryCode] = useState(0);
    const [formattedValue, setFormattedValue] = useState("");
    const [showCountrySelect, setShowCountrySelect] = useState(false);
    const formatter = useMemo(() => PhoneNumber.getAsYouType(regionCode), [regionCode]);

    const countryFlag = useCountryFlag(regionCode);

    const handleChange = useCallback(
        (tel: string) => {
            const removeFormatting = (str: string) => str.replaceAll(/[^+\d]/g, "");
            const removeCountryCode = (str: string) =>
                str.replace(new RegExp(`^\\+${countryCode} ?`), "");

            if (tel !== "0") {
                const phone = PhoneNumber(removeFormatting(tel), regionCode);
                const formatted = formatter.reset(
                    removeFormatting(phone.getNumber("international") ?? `+${countryCode}${tel}`)
                );

                setFormattedValue(removeCountryCode(formatted));
                if (removeCountryCode(formatted) !== "") onChange(formatted);
                setValid(removeCountryCode(formatted) === "" ? undefined : phone.isValid());
            }
        },
        [countryCode, formatter, onChange, regionCode]
    );
    const handleRegionChange = useCallback(
        (region: string = defaultRegionCode) => {
            if (region !== regionCode) handleChange(""); // Todo: focus input after

            setRegionCode(region);
            setShowCountrySelect(false);
            setCountryCode(PhoneNumber.getCountryCodeForRegionCode(region));
        },
        [handleChange, regionCode]
    );

    useEffect(
        () =>
            handleRegionChange(
                regionCode === undefined
                    ? value === ""
                        ? defaultRegionCode
                        : PhoneNumber(value).getRegionCode()
                    : props.regionCode
            ),
        [handleRegionChange, props.regionCode, regionCode, value]
    );
    useEffect(() => {
        if (showCountrySelect === true)
            (document.activeElement as HTMLElement)?.addEventListener(
                "blur",
                (e) =>
                    (e.target as HTMLElement)?.parentElement?.parentElement?.contains(
                        e.relatedTarget as Node
                    ) === false && setShowCountrySelect(false),
                { once: true }
            );
    }, [showCountrySelect]);

    const validateCharacter = (e: FormEvent<HTMLInputElement> & { data: string }) =>
        /\d/.test(e.data) === false && e.preventDefault();

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
            <div
                onClick={() => setShowCountrySelect((i) => !i)}
                className="flex flex-row gap-x-0.5 items-center justify-center px-3.5 py-3 rounded-l-xl bg-slate-100 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none cursor-pointer"
            >
                {countryFlag}
                <ChevronUpIcon
                    className={classNames("w-6 h-6 fill-slate-600", {
                        "rotate-180": showCountrySelect === false,
                    })}
                />
            </div>
            <div className="flex flex-row grow gap-x-2 items-center justify-start rounded-r-xl">
                <span className="text-lg text-slate-500 font-medium tracking-wide">
                    +{countryCode}
                </span>
                <div className="flex items-center grow w-[12.5rem] h-full rounded-r-xl">
                    <Input
                        type="tel"
                        required={required}
                        value={formattedValue}
                        onChange={handleChange}
                        onBeforeInput={validateCharacter}
                        className="text-lg text-slate-600 font-semibold grow w-full h-[3.75rem] !px-0 !py-3.5 tracking-wide focus:outline-none rounded-r-xl"
                    />
                </div>
            </div>
            <RegionSelect
                visible={showCountrySelect}
                selectedRegion={regionCode}
                onRegionChange={handleRegionChange}
            />
        </div>
    );
};

type Field = FunctionComponent<{
    value?: string;
    required?: boolean;
    regionCode?: string;
    onChange(val: string): void;
}>;

export default Field;
