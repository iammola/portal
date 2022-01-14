import { FunctionComponent, KeyboardEvent } from "react";

type Value = { [K in "_id" | "value"]: string };

type Main = FunctionComponent<{
    values: Value[];
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;

const Main: Main = ({ addValue, values }) => {
    function keyEvents(e: KeyboardEvent<HTMLElement>) {
        if (e.key === "Enter") {
            const lastChild = (e.target as HTMLElement).lastChild;
            const value = lastChild?.textContent?.trim();
            e.preventDefault();

            if (value != undefined && values.find((item) => item.value === value) === undefined) {
                lastChild?.remove();
                addValue({ _id: Date.now().toString(), value });
            }
        }
    }

    return (
        <div
            contentEditable
            onKeyDown={keyEvents}
            suppressContentEditableWarning
            className="w-full h-full border-4"
        >
            {values.map((item) => (
                <Badge key={item._id}>{item.value}</Badge>
            ))}
        </div>
    );
};

const Badge: FunctionComponent = ({ children }) => {
    return (
        <span contentEditable={false} suppressContentEditableWarning>
            {children}
        </span>
    );
};

export default Main;
