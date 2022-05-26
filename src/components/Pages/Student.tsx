import { Fragment, useState } from "react";
import useSWR from "swr";

import { useIsomorphicLayoutEffect } from "hooks";
import { Checkbox, RadioGroup, Select } from "components/Form";

export const AcademicRecord: React.FC<AcademicRecordProps> = ({ disabled, updateTerm, ...props }) => {
  const [terms, setTerms] = useState<Option[]>([]);
  const [classes, setClasses] = useState<Option[]>([]);
  const [subjects, setSubjects] = useState<SubjectOptions[]>([]);

  useSWR<API.Result<API.Term.GET.AllData>>("/api/terms", {
    onSuccess(result) {
      if (!result.success) return;

      let activeTerm = "";
      const terms = result.data
        .map(({ session, terms }) =>
          terms.map((term) => {
            if (term.current) activeTerm = String(term._id);

            return {
              _id: term._id,
              name: `${session.name.long} ${term.name.long} Term`,
            };
          })
        )
        .flat();

      setTerms(terms);
      updateTerm(activeTerm);
    },
  });
  useSWR<API.Result<API.Class.GET.AllData>>("/api/classes", {
    onSuccess(result) {
      if (!result.success) return;

      const classes = result.data.map((obj) => ({
        _id: obj._id,
        name: obj.name.long,
      }));

      setClasses(classes);
      if (classes.length > 0) props.updateClass(String(classes[0]._id));
    },
  });
  useSWR<API.Result<API.Class.GET.Subjects>>(props.class && `/api/classes/${props.class}/subjects`, {
    onSuccess(result) {
      if (!result.success) return setSubjects([]);

      const activeSubjects: string[] = [];
      const subjects = result.data.reduce<SubjectOptions[]>((acc, subject) => {
        const result =
          subject.__type === "base"
            ? ({ _id: subject._id, __type: "base" } as const)
            : ({
                __type: "group",
                divisions: subject.divisions.map((_) => ({ _id: _._id, name: _.name.long })),
              } as const);

        if (subject.mandatory)
          activeSubjects.push(String(subject.__type === "base" ? subject._id : subject.divisions[0]._id));

        return [...acc, { ...result, name: subject.name.long, mandatory: subject.mandatory }];
      }, []);

      setSubjects(subjects);
      props.updateSubjects(activeSubjects);
    },
  });

  function classChange(val: string) {
    props.updateClass(val);
    props.updateSubjects([]);
  }

  function baseCheckedChange(id: string, checked: boolean) {
    if (checked) return props.updateSubjects([...props.subjects, id]);
    return props.updateSubjects(props.subjects.filter((sub) => sub !== id));
  }

  function groupCheckedChange(id: string, checked?: string) {
    const filtered = props.subjects.filter((sub) => sub !== checked);
    if (id !== "none") filtered.push(id);

    props.updateSubjects(filtered);
  }

  useIsomorphicLayoutEffect(() => {
    if (!props.term && terms.length) updateTerm(String(terms[0]._id));
  }, [props.term, terms, updateTerm]);

  return (
    <Fragment>
      <div className="grid w-full gap-[inherit] md:grid-cols-[repeat(2,max-content)]">
        <Select required label="Term" value={props.term} onValueChange={updateTerm}>
          {terms.map((item) => (
            <Select.Item key={String(item._id)} value={String(item._id)}>
              {item.name}
            </Select.Item>
          ))}
        </Select>
        <Select required label="Class" value={props.class} onValueChange={classChange}>
          {classes.map((item) => (
            <Select.Item key={String(item._id)} value={String(item._id)}>
              {item.name}
            </Select.Item>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-5">
        {subjects.map((item) => {
          const checked = props.subjects.find((sub) => {
            if (item.__type === "base") return String(item._id) === sub;
            return item.divisions.map((_) => String(_._id)).includes(sub);
          });

          return item.__type === "base" ? (
            <Checkbox
              key={item.name}
              required={item.mandatory}
              checked={item.mandatory || !!checked}
              disabled={item.mandatory || disabled}
              onCheckedChange={(c) => baseCheckedChange(String(item._id), c as boolean)}
            >
              {item.name}
            </Checkbox>
          ) : (
            <div key={item.name} className="w-full space-y-1.5">
              <span className="text-xs font-medium text-gray-11 dark:text-gray-dark-11">{item.name}</span>
              <RadioGroup
                value={checked ?? ""}
                required={item.mandatory}
                onValueChange={(value) => groupCheckedChange(value, checked)}
              >
                {item.divisions.map((div) => (
                  <RadioGroup.Item key={div.name} value={String(div._id)}>
                    {div.name}
                  </RadioGroup.Item>
                ))}
                {checked && !item.mandatory && <RadioGroup.Item value="none">None</RadioGroup.Item>}
              </RadioGroup>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

type Option = {
  _id: Schemas.ObjectId;
  name: string;
};

type SubjectOption<T> = Omit<Option, "_id"> & {
  __type: T;
  mandatory?: boolean;
};

type SubjectOptions =
  | (SubjectOption<"base"> & Option)
  | ({
      divisions: Option[];
    } & SubjectOption<"group">);

type AcademicRecordProps = {
  term: string;
  class: string;
  disabled: boolean;
  subjects: string[];
  updateTerm(value: string): void;
  updateClass(value: string): void;
  updateSubjects(value: string[]): void;
};
