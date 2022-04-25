import Input, { InputProps } from "./Input";

const NumberInput: NumberInput = ({ onChange, value, ...props }) => {
  const validateCharacter = (e: React.FormEvent<HTMLInputElement> & { data: string }) =>
    !/\d/.test(e.data) && e.preventDefault();

  const padValue = () => {
    const v = +(value ?? 0);
    return v === 0 ? "" : v.toString().padStart(+(props.max ?? v).toString().length, "0");
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

type NumberInput = React.FC<
  Omit<InputProps, "pattern" | "inputMode" | "onBeforeInput" | "value" | "onChange" | "type"> & {
    value?: number;
    onChange(value: number): void;
  }
>;

export default NumberInput;
