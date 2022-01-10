import { FunctionComponent } from "react";

type Value = { [K in "_id" | "value"]: string };

type Main = FunctionComponent<{
    values: Value[];
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;

const Main: Main = () => {
    return <div contentEditable suppressContentEditableWarning />;
};

export default Main;
