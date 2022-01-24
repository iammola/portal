import { FunctionComponent } from "react";


    return (
        <div className={className}>
        </div>
    );
};

type DateInput = FunctionComponent<{
    min?: Date;
    max?: Date;
    value?: Date;
    className: string;
    onChange(val: Date): void;
}>;

export default DateInput;
