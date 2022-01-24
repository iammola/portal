import { FunctionComponent } from "react";

const DateInput: DateInput = ({ className }) => {
    return <div className={className}></div>;
};

type DateInput = FunctionComponent<{
    min?: Date;
    max?: Date;
    value?: Date;
    className: string;
}>;

export default DateInput;
