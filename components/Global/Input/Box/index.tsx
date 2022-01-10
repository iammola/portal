import { FunctionComponent } from "react";

import Main from "./Main";
import Badge from "./Badge";
import Label from "./Label";

const Input: Input = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

Input.Main = Main;
Input.Badge = Badge;
Input.Label = Label;

interface Input extends FunctionComponent<{ className?: string }> {
    Main: Main;
    Badge: Badge;
    Label: Label;
}

export default Input;
