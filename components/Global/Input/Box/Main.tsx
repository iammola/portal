import { FunctionComponent, KeyboardEvent, MouseEvent, useEffect, useRef } from "react";

import Badge, { Value } from "./Badge";

const Main: Main = ({ className, onChange, values }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = ref.current;
        if (values.length === 0 && target !== null) target.innerHTML = "";
    }, [values]);

    function updateValues(e: KeyboardEvent<HTMLElement>) {
        if (["Enter", "Space"].includes(e.code) === true) {
            const textNode = getSelection()?.anchorNode as ChildNode | null;
            const schoolMail = (textNode?.textContent?.trim() ?? "").toLowerCase();
            e.preventDefault();

            if (
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(schoolMail) === true &&
                values.find((item) => item.schoolMail === schoolMail) === undefined
            ) {
                textNode?.remove();
                onChange([...values, { schoolMail }]);
                setTimeout(addSpace);
                // Todo: trigger a function to get the teacher's username and initial by the school mail
            }
        }

        const lastChild = ref.current?.lastChild;
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
                    key={item.schoolMail}
                    remove={() =>
                        onChange(values.filter((value) => value.schoolMail !== item.schoolMail))
                    }
                    setName={(name) =>
                        onChange(
                            values.map((value) =>
                                value.schoolMail === item.schoolMail ? { ...value, name } : value
                            )
                        )
                    }
                />
            ))}
        </div>
    );
};

export default Main;

type Main = FunctionComponent<{
    values: Value[];
    className: string;
    onChange(values: Value[]): void;
}>;
