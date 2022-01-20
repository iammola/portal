import { FunctionComponent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef } from "react";

import { classNames } from "utils";

import type { UserBase } from "types/schema/User";

const Main: Main = ({ className, onChange, values }) => {
    const ref = useRef<HTMLDivElement>(null);
    const colors = useMemo(
        () => ["bg-slate-500", "bg-emerald-500", "bg-red-500", "bg-blue-500", "bg-amber-500"],
        []
    );
    const removeValue = (mail: string) =>
        onChange(values.filter((value) => value.schoolMail !== mail));

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
                onChange([...values, { schoolMail }]);
                setTimeout(addSpace);
                // Todo: trigger a function to get the teacher's username and initial by the school mail
            }
        }

        if (e.code === "Backspace" && lastChild?.textContent?.trim() === "") e.preventDefault();

        if (lastChild?.nodeType === 3 && lastChild.previousSibling?.nodeType === 3)
            lastChild.remove();
    }

    function handleKeyUp({ code }: KeyboardEvent<HTMLElement>) {
        if (code === "Backspace" && ref.current !== null) {
            const { lastChild, lastElementChild } = ref.current;

            if (lastElementChild?.tagName === "BR") lastElementChild.remove();
            if (lastChild?.textContent?.trim() === "") onChange(values.slice(0, -1));
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
            onKeyUp={handleKeyUp}
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

type Main = FunctionComponent<{
    values: Value[];
    className: string;
    onChange(values: Value[]): void;
}>;

type Badge = FunctionComponent<{
    item: Value;
    remove(): void;
    colors: string[];
}>;
