import { Fragment, FunctionComponent, KeyboardEvent, MouseEvent, useRef } from "react";
import { XIcon } from "@heroicons/react/outline";

type Value = { [K in "_id" | "value"]: string };

type Main = FunctionComponent<{
    values: Value[];
    className: string;
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;

type Badge = FunctionComponent<{
    remove(): void;
}>;

const Main: Main = ({ addValue, className, removeValue, values }) => {
    const ref = useRef<HTMLDivElement>(null);

    function updateValues(e: KeyboardEvent<HTMLElement>) {
        if (["Enter", "Space"].includes(e.code) === true) {
            const lastChild = (e.target as HTMLElement).lastChild;
            const value = lastChild?.textContent?.trim();
            e.preventDefault();

            if (
                value != undefined &&
                value !== "" &&
                values.find((item) => item.value === value) === undefined
            ) {
                lastChild?.remove();
                addValue({ _id: Date.now().toString(), value });
                setTimeout(addSpace);
            }
        }
    }

    function addSpace(e?: MouseEvent<HTMLDivElement>) {
        const target = (e?.target as HTMLDivElement) ?? ref.current;

        if (target !== null && target === ref.current) {
            if (target.lastChild !== null && target.lastChild.nodeType !== 3)
                target.insertAdjacentHTML("beforeend", "&nbsp;");

            focusCursor();
        }
    }

    function focusCursor() {
        const lastChild = ref.current?.lastChild;

        if (lastChild?.nodeType === 3) {
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

    return (
        <div
            ref={ref}
            contentEditable
            onClick={addSpace}
            className={className}
            onKeyDown={updateValues}
            suppressContentEditableWarning
        >
            {values.map((item) => (
                <Fragment key={item._id}>
                    <Badge remove={() => removeValue(item._id)}>{item.value}</Badge>
                    <span
                        contentEditable
                        suppressContentEditableWarning
                        className="w-[3.1875px] text-center text-transparent caret-black whitespace-pre last:hidden"
                    >
                        <br />
                    </span>
                </Fragment>
            ))}
        </div>
    );
};

const Badge: Badge = ({ children, remove }) => {
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
