import PhoneNumber from "awesome-phonenumber";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { FormEvent, FunctionComponent, useCallback, useMemo, useState } from "react";

import Input from "components/Form/Input";
import { classNames, useCountryFlag, useIsomorphicLayoutEffect } from "utils";

import Regions from "./Regions";

const Field: Field = ({ onChange, required, value = "", ...props }) => {
  const defaultRegionCode = "GB";
  const [typing, setTyping] = useState(false);
  const [valid, setValid] = useState<boolean>();
  const [regionCode, setRegionCode] = useState("");
  const [countryCode, setCountryCode] = useState(0);
  const [formattedValue, setFormattedValue] = useState("");
  const [showRegions, setShowRegions] = useState(false);
  const allowRegionChange = useMemo(() => props.regionCode === undefined, [props.regionCode]);
  const formatter = useMemo(() => PhoneNumber.getAsYouType(regionCode), [regionCode]);

  const countryFlag = useCountryFlag(regionCode);

  const removeFormatting = useCallback((str: string) => str.replaceAll(/[^+\d]/g, ""), []);

  const removeCountryCode = useCallback(
    (str: string) => str.replace(new RegExp(`^\\+${countryCode} ?`), ""),
    [countryCode]
  );

  const handleChange = useCallback(
    (tel: string) => {
      if (tel !== "0") {
        const phone = PhoneNumber(removeFormatting(tel), regionCode);
        const formatted = formatter.reset(
          removeFormatting(phone.getNumber("international") ?? `+${countryCode}${tel}`)
        );

        setFormattedValue(removeCountryCode(formatted));
        if (removeCountryCode(formatted) !== "") onChange(formatted);
      }
    },
    [countryCode, formatter, onChange, regionCode, removeCountryCode, removeFormatting]
  );

  const handleRegionChange = useCallback(
    (region: string = defaultRegionCode) => {
      if (region !== regionCode) handleChange(""); // Todo: focus input after

      setRegionCode(region);
      setShowRegions(false);
      setCountryCode(PhoneNumber.getCountryCodeForRegionCode(region));
    },
    [handleChange, regionCode]
  );

  useIsomorphicLayoutEffect(
    () =>
      setValid(removeCountryCode(value) === "" || typing ? undefined : PhoneNumber(removeFormatting(value)).isValid()),
    [removeCountryCode, removeFormatting, typing, value]
  );

  useIsomorphicLayoutEffect(() => {
    if (regionCode === "")
      handleRegionChange(
        props.regionCode !== undefined
          ? props.regionCode
          : value === ""
          ? defaultRegionCode
          : PhoneNumber(value).getRegionCode()
      );
  }, [handleRegionChange, props.regionCode, regionCode, value]);

  const validateCharacter = (e: FormEvent<HTMLInputElement> & { data: string }) =>
    !/\d/.test(e.data) && e.preventDefault();

  return (
    <div
      className={classNames(
        "relative flex w-full flex-row items-stretch justify-start gap-x-3 rounded-xl border border-slate-200 bg-white ring-2",
        {
          "ring-red-400": valid === false,
          "ring-transparent": valid === undefined,
          "focus-within:ring-emerald-400": valid,
        }
      )}
    >
      <div
        onClick={() => allowRegionChange && setShowRegions(!showRegions)}
        // NOTE: The `onBlur` prop in RegionSelect gets called when this click event is triggered to close
        className="flex min-w-[65px] cursor-pointer flex-row items-center justify-center gap-x-0.5 rounded-l-xl bg-slate-100 px-3.5 py-3 hover:bg-slate-200 focus:bg-slate-200 focus:outline-none"
      >
        {countryFlag}
        {allowRegionChange && (
          <ChevronUpIcon
            className={classNames("h-6 w-6 fill-slate-600", {
              "rotate-180": !showRegions,
            })}
          />
        )}
      </div>
      <div className="flex grow flex-row items-center justify-start gap-x-2 rounded-r-xl">
        <span className="text-lg font-medium tracking-wide text-slate-500">+{countryCode}</span>
        <div className="flex h-full w-[12.5rem] grow items-center rounded-r-xl">
          <Input
            type="tel"
            required={required}
            setTyping={setTyping}
            value={formattedValue}
            onChange={handleChange}
            onBeforeInput={validateCharacter}
            className="h-[3.75rem] w-full grow rounded-r-xl !border-none !px-0 !py-3.5 text-lg font-semibold tracking-wide text-slate-600 !ring-transparent focus:outline-none"
          />
        </div>
      </div>
      {allowRegionChange && (
        <Regions
          visible={showRegions}
          selectedRegion={regionCode}
          onRegionChange={handleRegionChange}
          onBlur={() => setShowRegions(false)}
        />
      )}
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
