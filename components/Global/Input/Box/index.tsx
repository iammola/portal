import { FunctionComponent } from "react";

import Main from "./Main";
import Label from "./Label";

const Input: Input = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

Input.Main = Main;
Input.Label = Label;

interface Input extends FunctionComponent<{ className?: string }> {
    Main: Main;
    Label: Label;
}

export default Input;
