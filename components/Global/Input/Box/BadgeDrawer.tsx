import { FunctionComponent } from "react";

import type { Value } from "./Badge";

type Drawer = FunctionComponent<{
    item: Value;
    valid?: boolean;
    className: string;
    selectedColor: string;
}>;

const Drawer: Drawer = ({ className, item, selectedColor, valid }) => {
    return (
        <div className={className}>
        </div>
    );
};

export default Drawer;
