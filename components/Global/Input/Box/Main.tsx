import { FunctionComponent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef } from "react";

import { classNames } from "utils";

type Main = FunctionComponent<{
    values: Value[];
    className: string;
    addValue(v: Value): void;
    removeValue(v: Value["_id"]): void;
}>;
import type { UserBase } from "types/schema/User";

const Main: Main = ({ addValue, className, removeValue, values }) => {
    const ref = useRef<HTMLDivElement>(null);
    const colors = useMemo(
        () => ["bg-slate-500", "bg-emerald-500", "bg-red-500", "bg-blue-500", "bg-amber-500"],
        []
    );

    useEffect(() => {
        const target = ref.current;
        if (values.length === 0 && target !== null) target.innerHTML = "";
    }, [values]);

    function updateValues(e: KeyboardEvent<HTMLElement>) {
        const lastChild = ref.current?.lastChild;

        if (["Enter", "Space"].includes(e.code) === true) {
            const schoolMail = lastChild?.textContent?.trim() ?? "";
            e.preventDefault();

            if (
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(schoolMail) === true &&
                values.find((item) => item.schoolMail === schoolMail) === undefined
            ) {
                lastChild?.remove();
                addValue({ _id: Date.now().toString(), value });
                setTimeout(addSpace);
            }
        }

        if (e.code === "Backspace" && lastChild?.textContent?.trim() === "") e.preventDefault();

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
                <Badge
                    item={item}
                    colors={colors}
                    key={item.schoolMail}
                    remove={() => removeValue(item.schoolMail)}
                />
            ))}
        </div>
    );
};

const Badge: Badge = ({ colors, item }) => {
    const selectedColor = useMemo(
        () => colors[Math.floor(Math.random() * colors.length)],
        [colors]
    );

    return (
        <div
            contentEditable={false}
            suppressContentEditableWarning
            className="flex flex-row gap-x-2.5 items-center justify-between min-w-max max-w-full border p-[2px] pr-3 rounded-full bg-white"
        >
            <span
                className={classNames(
                    "flex items-center justify-center rounded-full overflow-hidden text-sm text-white uppercase aspect-square w-[1.85rem]",
                    selectedColor
                )}
            >
                {(item.name?.initials ?? item.schoolMail)[0]}
            </span>
            <span className="text-sm text-gray-600 tracking-wide">
                {item.name?.username ?? item.schoolMail}
            </span>
        </div>
    );
};

export default Main;

export type Value = Pick<UserBase, "schoolMail"> & {
    name?: Pick<UserBase["name"], "username" | "initials">;
};

type Badge = FunctionComponent<{
    item: Value;
    remove(): void;
    colors: string[];
}>;
