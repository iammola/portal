import { FunctionComponent } from "react";

const PhoneInput: PhoneInput = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

PhoneInput.Label = ({ children, className }) => {
    return <span className={className}>{children}</span>;
};

interface PhoneInput extends FunctionComponent<{ className: string }> {
    Label: FunctionComponent<{ className: string }>;
}

export default PhoneInput;
