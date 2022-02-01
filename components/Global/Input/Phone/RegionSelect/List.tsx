import { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import PhoneNumber from "awesome-phonenumber";
import { byIso } from "country-code-lookup";

import { useCountryFlag } from "hooks";
import { classNames } from "utils";

const List: List = ({
  className,
  handleRegionChange,
  search,
  selectedRegion,
  visible,
}) => {
  const otherRegions = useMemo<{ [k: string]: string | undefined }>(
    () => ({
      AC: "Ascension Island",
      TA: "Tristan da Cunha",
      HL: "Saint Helena",
    }),
    []
  );
  const regions = useMemo(
    () =>
      PhoneNumber.getSupportedRegionCodes().map(
        (region) =>
          [
            region,
            PhoneNumber.getCountryCodeForRegionCode(region),
            byIso(region)?.country ?? otherRegions[region],
          ] as const
      ),
    [otherRegions]
  );

  const filteredRegions = useMemo(
    () =>
      regions.filter((i) =>
        i.some((j) => new RegExp(search, "gi").test(String(j ?? "")))
      ),
    [regions, search]
  );

  return (
    <ul className={className}>
      {filteredRegions.map(([regionCode, countryCode, country]) => (
        <List.Item
          key={regionCode}
          selected={regionCode === selectedRegion}
          onClick={() => handleRegionChange(regionCode)}
          {...{ country, countryCode, regionCode, visible }}
          className={(selected) =>
            classNames(
              "flex cursor-pointer flex-row items-center justify-start gap-x-4 rounded-xl p-2 hover:bg-slate-100 focus:outline-none",
              [selected, "focus:bg-slate-50", ""]
            )
          }
        />
      ))}
      {filteredRegions.length === 0 && (
        <div className="flex items-center justify-center p-2 text-sm font-medium text-slate-700">
          Change your search phrase 🙏
        </div>
      )}
    </ul>
  );
};

List.Item = function Item({
  country,
  countryCode,
  regionCode,
  className,
  onClick,
  selected,
  visible,
}) {
  const ref = useRef<
    HTMLLIElement & {
      scrollIntoViewIfNeeded?: (centerIfNeeded?: boolean) => void;
    }
  >(null);
  const countryFlag = useCountryFlag(regionCode);

  useEffect(() => {
    if (selected && visible) {
      ref.current?.scrollIntoViewIfNeeded?.() ??
        ref.current?.parentElement?.scroll(
          0,
          ref.current?.offsetTop -
            ref.current?.parentElement?.offsetHeight / 2.6
        );
    }
  }, [selected, visible]);

  useEffect(() => {
    if (country === undefined)
      console.warn(`No country data for ${regionCode} region`);
  }, [country, regionCode]);

  return (
    <li
      ref={ref}
      tabIndex={0}
      onClick={onClick}
      className={className(selected)}
    >
      {countryFlag}
      <span className="text-sm font-medium text-slate-700">
        {country} (+{countryCode})
      </span>
      {selected && (
        <CheckIcon className="ml-auto mr-2 h-5 w-5 fill-slate-800" />
      )}
    </li>
  );
};

type ListProps = {
  search: string;
  visible: boolean;
  className: string;
  selectedRegion: string;
  handleRegionChange(regionCode: string): void;
};

interface List extends FunctionComponent<ListProps> {
  Item: FunctionComponent<{
    country?: string;
    visible: boolean;
    selected: boolean;
    regionCode: string;
    countryCode: number;
    onClick(): void;
    className: (selected: boolean) => string;
  }>;
}

export default List;
