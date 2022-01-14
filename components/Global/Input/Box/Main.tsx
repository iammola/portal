import { FunctionComponent, KeyboardEvent, MouseEvent, useRef } from "react";
import { XIcon } from "@heroicons/react/outline";

type Value = { [K in "_id" | "value"]: string };

type Main = FunctionComponent<{
    values: Value[];
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;

const Main: Main = ({ addValue, removeValue, values }) => {
    const ref = useRef<HTMLDivElement>(null);

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

    function addSpace(e: MouseEvent<HTMLDivElement>) {
        const field = (e.target as HTMLDivElement).closest("[contenteditable=true]");

        if (field === e.target) {
            if (field.lastChild !== null && field.lastChild.nodeType !== 3)
                field.insertAdjacentHTML("beforeend", "&nbsp;");
            const lastChild = field.lastChild;

            if (lastChild !== null) {
                const range = document.createRange();
                const selection = getSelection();

                range.setStart(
                    lastChild,
                    +(lastChild.textContent !== " ") * (lastChild.textContent?.length ?? 0)
                );
                range.collapse(false);

                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
    }

    return (
        <div
            ref={ref}
            contentEditable
            onClick={addSpace}
            onKeyDown={keyEvents}
            suppressContentEditableWarning
            className="flex flex-row flex-wrap gap-2 content-start items-start justify-start w-full h-full focus:outline-none"
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
