import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useCallback, useId, useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import { getFlagEmoji } from "utils";
import { useIsomorphicLayoutEffect } from "hooks";

const { parsePhoneNumber, getAsYouType, getSupportedRegionCodes, getCountryCodeForRegionCode } = await import(
  "awesome-phonenumber"
);

export const Phone: React.FC<PhoneProps> = ({ children, id, onValueChange, ...props }) => {
  const customId = useId();
  const [formatted, setFormatted] = useState("");

  const [regions] = useState(getSupportedRegionCodes);
  const [regionNames] = useState(() => new Intl.DisplayNames([], { type: "region" }));
  const [region, setRegion] = useState(() => parsePhoneNumber(props.value ?? "").getRegionCode() ?? "NG");

  const formatter = useMemo(() => getAsYouType(region), [region]);

  const updateRegion = useCallback(
    (region: string) => {
      onValueChange("");
      setFormatted("");
      setRegion(region);
    },
    [onValueChange]
  );

  const updateValue = useCallback(
    (value: string) => {
      const phone = value.replace(/(\s|-|\(|\))*/g, "") || null;
      setFormatted(formatter.reset(phone as string));

      const formatted = formatter.getPhoneNumber();
      onValueChange(formatted.getNumber("e164") ?? "");
      setRegion((region) => formatted.getRegionCode() ?? region);
    },
    [formatter, onValueChange]
  );

  useIsomorphicLayoutEffect(() => {
    if (!props.value) setFormatted("");
  }, [props.value]);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <SelectPrimitive.Root value={region} onValueChange={updateRegion}>
        <div className="relative flex w-full">
          <SelectPrimitive.Trigger className="inline-flex shrink-0 items-center justify-center gap-2 rounded-l bg-gray-3 px-4 text-sm text-gray-11 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:bg-gray-dark-3 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5">
            <SelectPrimitive.Value>{getFlagEmoji(region)}</SelectPrimitive.Value>
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <input
            {...props}
            type="tel"
            value={formatted}
            autoComplete="tel"
            id={id || customId}
            onChange={(e) => updateValue(e.target.value)}
            className="inline-flex h-[45px] grow items-center justify-center rounded-r bg-gray-3 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:focus:ring-gray-dark-8"
          />
        </div>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-md dark:bg-gray-dark-3">
          <SelectPrimitive.ScrollUpButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="flex flex-col justify-start gap-3 py-3">
            {regions.map((region) => (
              <SelectPrimitive.Item
                key={region}
                value={region}
                className="relative flex h-9 cursor-pointer select-none items-center py-2 pr-9 pl-6 text-sm tracking-wide text-gray-11 hover:bg-gray-4 focus:bg-gray-5 focus:outline-none dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:bg-gray-dark-5"
              >
                <SelectPrimitive.ItemText>
                  <div className="flex items-center gap-3">
                    <span className="inline-grid place-items-center">{getFlagEmoji(region)}</span>
                    <span className="text-sm text-gray-12 dark:text-gray-dark-12">
                      {regionNames.of(region)} (+{getCountryCodeForRegionCode(region)})
                    </span>
                  </div>
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-0 inline-grid w-6 place-items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </div>
  );
};

export default Phone;

type PhoneProps = {
  value?: string;
  children: string;
  onValueChange(val: string): void;
} & Omit<React.ComponentProps<"input">, "value">;
