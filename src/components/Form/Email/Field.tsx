import { useRef, useEffect, useCallback } from "react";

import Badge, { Value } from "./Badge";

import type { UserType } from "types/schema";

const Field: Field = ({ className, onChange, userType, values }) => {
  const ref = useRef<HTMLDivElement>(null);
  const setValueName = useCallback(
    (item: Required<Value>) => onChange(values.map((value) => (value.mail === item.mail ? item : value))),
    [onChange, values]
  );
  const resetField = useCallback(() => {
    const target = ref.current;
    if (values.length === 0 && target?.children.length !== 0) target?.replaceChildren();
  }, [values.length]);

  useEffect(() => {
    resetField();
  }, [resetField]);

  function editValue(schoolMail: string) {
    onChange(values.filter((value) => value.mail !== schoolMail));
    removeSpace();
    ref.current?.insertAdjacentHTML("beforeend", schoolMail);
    focusCursor();
  }

  function removeSpace() {
    const { childNodes = [] } = ref.current ?? {};
    [...childNodes].forEach(
      (node) =>
        ((node.nodeType === 3 && node.textContent?.trim() === "") || (node as Element).tagName === "BR") &&
        node.remove()
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (["Enter", "Space"].includes(e.code)) {
      const textNode = getSelection()?.anchorNode as ChildNode | null;
      const mail = (textNode?.textContent?.trim() ?? "").toLowerCase();
      e.preventDefault();

      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(mail) &&
        values.find((item) => item.mail === mail) === undefined
      ) {
        removeSpace();
        textNode?.remove();
        onChange([...values, { mail }]);
        setTimeout(addSpace);
      }
    }

    const lastChild = ref.current?.lastChild;
    if (e.code === "Backspace" && lastChild?.textContent?.trim() === "") {
      e.preventDefault();
      onChange(values.slice(0, -1));
    }

    if (lastChild?.nodeType === 3 && lastChild.previousSibling?.nodeType === 3) lastChild.remove();
  }

  function addSpace(e?: React.MouseEvent<HTMLElement>) {
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

      range.setStart(lastChild, +(lastChild.textContent !== " ") * (lastChild.textContent?.length ?? 0));
      range.collapse(false);

      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <article
      ref={ref}
      contentEditable
      inputMode="email"
      onClick={addSpace}
      onKeyUp={resetField}
      className={className}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
    >
      {values.map((item) => (
        <Badge
          {...{ item, userType }}
          key={item.mail}
          setItem={setValueName}
          edit={() => editValue(item.mail)}
          remove={() => onChange(values.filter((value) => value.mail !== item.mail))}
        />
      ))}
    </article>
  );
};

export default Field;

type Field = React.FC<{
  values: Value[];
  className: string;
  userType: UserType;
  onChange(values: Value[]): void;
}>;
