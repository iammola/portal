import PhoneNumber from "awesome-phonenumber";
import * as countries from "i18n-iso-countries";
import englishCountries from "i18n-iso-countries/langs/en.json";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
  DividerHorizontalIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

import { checkPasswordStrength, cx, getFlagEmoji } from "utils";

export const Input: React.FC<InputProps> = ({ children, id, onChange, validators, ...props }) => {
  const customId = useId();
  const [error, setError] = useState<string | null>(); // `string` - Error; `null` - No Error; `undefined` - Nothing

  useEffect(() => {
    const value = props.value;
    if (!value) return;

    const error = validators?.find(({ test: t }) => !(typeof t === "object" ? t.test(value) : t(value)));
    if (error) setError(error.message);
    else {
      setError(null);
      setTimeout(() => setError((err) => (err === null ? undefined : err)), 3e3);
    }
  }, [props.value, validators]);

  return (
    <div className="flex flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <input
        {...props}
        type="text"
        id={id || customId}
        onChange={(e) => onChange(e.target.value)}
        className="inline-flex h-[45px] w-full min-w-[300px] items-center justify-center rounded bg-gray-2 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:focus:ring-gray-dark-8"
      />
      {error && (
        <span className="mt-1 inline-flex items-center justify-start gap-1 text-xs text-red-11 dark:text-red-dark-11">
          <Cross2Icon />
          {error}
        </span>
      )}
      {error === null && (
        <span className="mt-1 inline-flex items-center justify-start gap-1 text-xs text-green-11 dark:text-green-dark-11">
          <CheckIcon />
          Looks Good!
        </span>
      )}
    </div>
  );
};

export const Password: React.FC<InputProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [check] = useState(checkPasswordStrength);

  const strength = useMemo(() => {
    const value = props.value as string;
    const { score = -1 } = value ? check(value) : {};
    const title = ["Poor", "Weak", "Good", "Strong"][score] ?? "No";

    return { score, title };
  }, [check, props.value]);

  return (
    <PopoverPrimitive.Root>
      <div className="relative flex flex-col items-start justify-center gap-1">
        <LabelPrimitive.Root
          htmlFor={id || customId}
          className="flex w-full select-none items-center justify-between gap-4"
        >
          <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        </LabelPrimitive.Root>
        <PopoverPrimitive.Anchor className="relative">
          <PopoverPrimitive.Trigger asChild>
            <input
              {...props}
              id={id || customId}
              type={isVisible ? "text" : "password"}
              onChange={(e) => onChange(e.target.value)}
              className="inline-flex h-[45px] w-full min-w-[300px] items-center justify-center rounded bg-gray-2 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:focus:ring-gray-dark-8"
            />
          </PopoverPrimitive.Trigger>
          <div
            onClick={() => setIsVisible(!isVisible)}
            className="absolute top-0 bottom-0 right-2 inline-flex w-6 cursor-pointer items-center justify-center text-gray-11 dark:text-gray-dark-11"
          >
            {isVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Content
          sideOffset={7}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="flex min-w-[300px] flex-col items-start justify-center gap-3 rounded-md bg-white p-5 shadow-md focus:outline-none dark:bg-gray-dark-3"
        >
          <h4 className="font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{strength.title} Password</h4>
          <div className="flex w-full justify-start gap-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className={cx(
                  "h-1.5 shrink-0 grow rounded-full",
                  idx <= strength.score
                    ? {
                        "bg-red-9 dark:bg-red-dark-9": strength.score < 2,
                        "bg-green-9 dark:bg-green-dark-9": strength.score > 2,
                        "bg-amber-9 dark:bg-amber-dark-9": strength.score === 2,
                      }
                    : "bg-gray-5 dark:bg-gray-dark-5"
                )}
              />
            ))}
          </div>
          <PopoverPrimitive.Arrow className="fill-white dark:fill-gray-dark-3" />
        </PopoverPrimitive.Content>
      </div>
    </PopoverPrimitive.Root>
  );
};

countries.registerLocale(englishCountries);
export const Phone: React.FC<InputProps> = ({ children, id, onChange, ...props }) => {
  const customId = useId();
  const [formatted, setFormatted] = useState("");
  const [regions] = useState(PhoneNumber.getSupportedRegionCodes());
  const [activeRegion, setActiveRegion] = useState(() => {
    let region = PhoneNumber(props.value ?? "").getRegionCode() ?? "";
    if (!region && typeof window !== "undefined") region = new Intl.Locale(navigator.language).region ?? "";
    return region;
  });
  const formatter = useMemo(() => PhoneNumber.getAsYouType(activeRegion), [activeRegion]);

  const updateRegion = useCallback(
    (regionCode: string) => {
      onChange("");
      setFormatted("");
      setActiveRegion(regionCode);
    },
    [onChange]
  );

  const updateValue = useCallback(
    (value: string) => {
      const phone = value.replace(/(\s|-|\(|\))*/g, "") || null;

      setFormatted(formatter.reset(phone as string));
      onChange(formatter.getPhoneNumber().getNumber() ?? "");
    },
    [formatter, onChange]
  );

  return (
    <div className="flex flex-col items-start justify-center gap-1">
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="flex w-full select-none items-center justify-between gap-4"
      >
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{children}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </LabelPrimitive.Root>
      <SelectPrimitive.Root value={activeRegion} onValueChange={updateRegion}>
        <div className="relative flex">
          <SelectPrimitive.Trigger className="inline-flex items-center justify-center gap-2 rounded-l bg-gray-2 px-4 text-sm text-gray-11 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:bg-gray-dark-3 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5">
            <SelectPrimitive.Value>{getFlagEmoji(activeRegion)}</SelectPrimitive.Value>
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <input
            {...props}
            type="tel"
            value={formatted}
            id={id || customId}
            onChange={(e) => updateValue(e.target.value)}
            className="inline-flex h-[45px] w-full min-w-[300px] items-center justify-center rounded-r bg-gray-2 px-2.5 text-sm text-gray-12 focus:outline-none focus:ring-2 focus:ring-gray-8 dark:bg-gray-dark-3 dark:text-gray-dark-12 dark:ring-gray-dark-7 dark:focus:ring-gray-dark-8"
          />
        </div>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-md dark:bg-gray-dark-3">
          <SelectPrimitive.ScrollUpButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="flex flex-col justify-start gap-3 py-3">
            {regions.map((region) => (
              <Select.Item key={region} value={region}>
                <div className="flex items-center gap-3">
                  <span>{getFlagEmoji(region)}</span>
                  <span className="text-sm text-gray-11">
                    {countries.getName(region, "en") || region} (+{PhoneNumber.getCountryCodeForRegionCode(region)})
                  </span>
                </div>
              </Select.Item>
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

export const Select: Select = ({ children, label, ...props }) => {
  return (
    <LabelPrimitive.Root className="flex flex-col items-start justify-center gap-1">
      <span className="flex w-full select-none items-center justify-between gap-4">
        <span className="text-sm font-medium tracking-wide text-gray-12 dark:text-gray-dark-12">{label}</span>
        {!props.required && <span className="text-xs text-gray-11 dark:text-gray-dark-11">Optional</span>}
      </span>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger className="inline-flex h-[45px] max-w-[250px] select-none items-center justify-center gap-8 rounded bg-gray-3 px-4 text-sm text-gray-11 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-7 active:bg-gray-5 dark:bg-gray-dark-3 dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-7 dark:active:bg-gray-dark-5">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-md dark:bg-gray-dark-3">
          <SelectPrimitive.ScrollUpButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="flex flex-col justify-start gap-1 py-3">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="grid h-6 place-items-center bg-white text-gray-11 dark:bg-gray-dark-2 dark:text-gray-dark-11">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    </LabelPrimitive.Root>
  );
};

Select.Item = function Item({ children, ...props }) {
  return (
    <SelectPrimitive.Item
      {...props}
      className="relative flex h-9 cursor-pointer select-none items-center py-2 pr-9 pl-6 text-sm tracking-wide text-gray-11 hover:bg-gray-4 focus:bg-gray-5 focus:outline-none dark:text-gray-dark-11 dark:hover:bg-gray-dark-4 dark:focus:bg-gray-dark-5"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-grid w-6 place-items-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

export const Checkbox: React.FC<CheckboxProps> = ({ children, id, ...props }) => {
  const customId = useId();

  return (
    <div className="flex items-center gap-2.5">
      <CheckboxPrimitive.Root
        {...props}
        id={id || customId}
        className="grid h-6 w-6 place-items-center rounded bg-white hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-gray-5 active:bg-gray-5 dark:bg-gray-dark-3 dark:hover:bg-gray-dark-4 dark:focus:ring-gray-dark-5 dark:active:bg-gray-dark-5"
      >
        <CheckboxPrimitive.Indicator className="text-gray-11">
          {props.checked === true && <CheckIcon />}
          {props.checked === "indeterminate" && <DividerHorizontalIcon />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <LabelPrimitive.Root
        htmlFor={id || customId}
        className="select-none text-sm tracking-wide text-gray-12 dark:text-gray-dark-12"
      >
        {children}
      </LabelPrimitive.Root>
    </div>
  );
};

interface InputProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  id?: string;
  value?: string;
  children: string;
  onChange(val: string): void;
  validators?: Array<{
    message: string;
    test: RegExp | ((val: string) => boolean);
  }>;
}

type CheckboxProps = CP<Parameters<typeof CheckboxPrimitive.Root>[0], string>;

interface SelectProps {
  label: string;
  required?: boolean;
}

interface Select extends React.FC<CP<Parameters<typeof SelectPrimitive.Root>[0] & SelectProps>> {
  Item: React.FC<Parameters<typeof SelectPrimitive.Item>[0]>;
}
