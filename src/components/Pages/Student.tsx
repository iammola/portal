import { Fragment, useState } from "react";
import useSWR from "swr";

import { useIsomorphicLayoutEffect } from "hooks";
import { Checkbox, Select } from "components/Form";

export const AcademicRecord: React.FC<AcademicRecordProps> = ({ disabled, updateTerm, ...props }) => {
  const [terms, setTerms] = useState<Option[]>([]);
  const [classes, setClasses] = useState<Option[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);

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

      const subjectDetails = (obj: Pick<Schemas.Subject.Record, "_id" | "mandatory" | "name">) => ({
        _id: obj._id,
        name: obj.name.long,
        mandatory: obj.mandatory,
      });

      const subjects = result.data.reduce<SubjectOption[]>((acc, subject) => {
        const result = subject.__type === "base" ? [subjectDetails(subject)] : subject.divisions.map(subjectDetails);
        return [...acc, ...result];
      }, []);

      setSubjects(subjects);
      props.updateSubjects(subjects.filter((d) => d.mandatory).map((subject) => String(subject._id)));
    },
  });

  function classChange(val: string) {
    props.updateClass(val);
    props.updateSubjects([]);
  }

  function checkedChange(checked: boolean, id: string) {
    if (checked) return props.updateSubjects([...props.subjects, id]);
    props.updateSubjects(props.subjects.filter((sub) => sub !== id));
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
        {subjects.map((item, idx) => (
          <Checkbox
            key={idx}
            disabled={item.mandatory || disabled}
            checked={item.mandatory || props.subjects.includes(String(item._id))}
            onCheckedChange={(c) => checkedChange(c as boolean, String(item._id))}
          >
            {item.name}
          </Checkbox>
        ))}
      </div>
    </Fragment>
  );
};

type Option = {
  _id: Schemas.ObjectId;
  name: string;
};

type SubjectOption = {
  mandatory?: boolean;
} & Option;

type AcademicRecordProps = {
  term: string;
  class: string;
  disabled: boolean;
  subjects: string[];
  updateTerm(value: string): void;
  updateClass(value: string): void;
  updateSubjects(value: string[]): void;
};
