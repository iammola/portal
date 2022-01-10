import { FunctionComponent } from "react";

type Value = { [K in "_id" | "value"]: string };

type Main = FunctionComponent<{
    values: Value[];
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;

const Main: Main = ({ values }) => {
    return (
        <div
            contentEditable
            suppressContentEditableWarning
            className="w-full h-full border-4"
        >
            {values.map((item) => (
                <li key={item._id}>{item.value}</li>
            ))}
        </div>
    );
};

export default Main;
