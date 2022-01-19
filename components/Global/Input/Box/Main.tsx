import { Fragment, FunctionComponent, KeyboardEvent, MouseEvent, useEffect, useRef } from "react";
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

    useEffect(() => {
        const target = ref.current;
        if (values.length === 0 && target !== null) target.innerHTML = "";
    }, [values]);

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

        if (e.code === "Backspace") {
            const lastChild = (e.target as HTMLElement).lastChild;
            if (lastChild?.textContent?.trim() === "") e.preventDefault();
        }

        const lastChild = ref.current?.lastChild;
        if (lastChild?.nodeType === 3 && lastChild.previousSibling?.nodeType === 3)
            lastChild.remove();
    }

    function keyUpRemove(e: KeyboardEvent<HTMLElement>) {
        if (e.code === "Backspace") {
            removeBadge();
            removeLineBreak((e.target as HTMLElement).lastElementChild);
        }
    }

    function removeLineBreak(element: Element | null) {
        if (element?.tagName === "BR") element.remove();
    }

    function removeBadge() {
        const selection = getSelection();

        if (selection?.type === "Caret" && selection.focusNode?.textContent?.trim() === "") {
            const lastBadge = (
                selection.focusNode.nodeType === 1
                    ? selection.focusNode.previousSibling
                    : selection.focusNode.previousSibling?.previousSibling
            ) as HTMLElement | null;

            if (lastBadge?.isContentEditable === false) {
                const badgeId = values.find(
                    ({ value }) => value === lastBadge.firstElementChild?.textContent
                )?._id;

                if (badgeId !== undefined) removeValue(badgeId);
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
            onKeyUp={keyUpRemove}
            suppressContentEditableWarning
        >
            {values.map((item) => (
                <Fragment key={item._id}>
                    <Badge remove={() => removeValue(item._id)}>{item.value}</Badge>
                    <span className="w-[3.1875px] text-center text-transparent caret-black whitespace-pre last:hidden">
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
            className="flex flex-row gap-x-2 items-center justify-between min-w-max max-w-full py-1 pl-3 pr-1 rounded-full bg-slate-200"
        >
            <span className="text-sm font-medium text-slate-700">{children}</span>
            <XIcon
                onClick={remove}
                className="w-6 h-6 p-1 shrink-0 rounded-full stroke-slate-700 cursor-pointer hover:bg-slate-300"
            />
        </span>
    );
};

export default Main;
