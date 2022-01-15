import { FunctionComponent } from "react";

type Label = FunctionComponent<{ className: string }>;

const Label: Label = ({ children, className }) => {
    return <span className={className}>{children}</span>;
};

export default Label;
