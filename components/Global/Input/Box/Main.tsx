import { FunctionComponent, KeyboardEvent } from "react";
import { XIcon } from "@heroicons/react/outline";

type Value = { [K in "_id" | "value"]: string };

type Main = FunctionComponent<{
    values: Value[];
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;

const Main: Main = ({ addValue, removeValue, values }) => {
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
            className="flex flex-row flex-wrap gap-x-4 gap-y-8 content-start items-start justify-start w-full h-full focus:outline-none"
        >
            {values.map((item) => (
                <Badge key={item._id} remove={() => removeValue(item._id)}>
                    {item.value}
                </Badge>
            ))}
        </div>
    );
};

const Badge: FunctionComponent<{ remove(): void }> = ({ children, remove }) => {
    return (
        <span
            contentEditable={false}
            suppressContentEditableWarning
            className="flex flex-row gap-x-2 items-center justify-between min-w-max max-w-full py-1 pl-3 pr-1 rounded-full bg-gray-200"
        >
            <span className="text-sm font-medium text-gray-700">{children}</span>
            <XIcon
                onClick={remove}
                className="w-6 h-6 p-1 shrink-0 rounded-full stroke-gray-700 cursor-pointer hover:bg-gray-300"
            />
        </span>
    );
};

export default Main;
