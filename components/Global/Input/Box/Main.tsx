import {
    useRef,
    useEffect,
    MouseEvent,
    useCallback,
    KeyboardEvent,
    FunctionComponent,
} from "react";

import Badge, { Value } from "./Badge";

const Main: Main = ({ className, onChange, values }) => {
    const ref = useRef<HTMLDivElement>(null);
    const setValueName = useCallback(
        (item: Required<Value>) =>
            onChange(values.map((value) => (value.schoolMail === item.schoolMail ? item : value))),
        [onChange, values]
    );

    useEffect(() => {
        const target = ref.current;
        if (values.length === 0 && target?.textContent?.trim() === "") target.innerHTML = "";
    }, [values]);

    function editValue(schoolMail: string) {
        onChange(values.filter((value) => value.schoolMail !== schoolMail));
        removeSpace();
        ref.current?.insertAdjacentHTML("beforeend", schoolMail);
        focusCursor();
    }

    function removeSpace() {
        const { childNodes = [] } = ref.current ?? {};
        [...childNodes].forEach(
            (node) => (node.nodeType === 3 || (node as Element).tagName === "BR") && node.remove()
        );
    }

    function handleKeyUp(e: KeyboardEvent<HTMLElement>) {
        if (["Enter", "Space"].includes(e.code) === true) {
            const textNode = getSelection()?.anchorNode as ChildNode | null;
            const schoolMail = (textNode?.textContent?.trim() ?? "").toLowerCase();
            e.preventDefault();

            if (
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(schoolMail) === true &&
                values.find((item) => item.schoolMail === schoolMail) === undefined
            ) {
                removeSpace();
                textNode?.remove();
                onChange([...values, { schoolMail }]);
                setTimeout(addSpace);
            }
        }

        const lastChild = ref.current?.lastChild;
        if (e.code === "Backspace" && lastChild?.textContent?.trim() === "") {
            e.preventDefault();
            onChange(values.slice(0, -1));
        }

        if (lastChild?.nodeType === 3 && lastChild.previousSibling?.nodeType === 3)
            lastChild.remove();
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
            onKeyDown={handleKeyUp}
            suppressContentEditableWarning
        >
            {values.map((item) => (
                <Badge
                    item={item}
                    key={item.schoolMail}
                    setItem={setValueName}
                    edit={() => editValue(item.schoolMail)}
                    remove={() =>
                        onChange(values.filter((value) => value.schoolMail !== item.schoolMail))
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
