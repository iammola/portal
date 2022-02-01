import { FormEvent, FunctionComponent } from "react";

import Input, { InputProps } from ".";

const NumberInput: NumberInput = ({ onChange, value, ...props }) => {
  const validateCharacter = (
    e: FormEvent<HTMLInputElement> & { data: string }
  ) => !/\d/.test(e.data) && e.preventDefault();

  const padValue = () => {
    const v = +(value ?? 0);
    return v === 0
      ? ""
      : v.toString().padStart(+(props.max ?? v).toString().length, "0");
  };

  return (
    <Input
      {...props}
      type="number"
      pattern="\d+"
      value={padValue()}
      inputMode="numeric"
      id={props.id as string}
      label={props.label as string}
      onChange={(val) => onChange(+val)}
      onBeforeInput={validateCharacter}
    />
  );
};

type NumberInput = FunctionComponent<
  Omit<
    InputProps,
    "pattern" | "inputMode" | "onBeforeInput" | "value" | "onChange" | "type"
  > & {
    value?: number;
    onChange(value: number): void;
  }
>;

export default NumberInput;
