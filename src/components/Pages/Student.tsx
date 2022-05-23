import { Fragment, useMemo } from "react";
import useSWR from "swr";

import { useIsomorphicLayoutEffect } from "hooks";
import { Checkbox, Select } from "components/Form";

export const AcademicRecord: React.FC<AcademicRecordProps> = ({ disabled, updateSubjects, updateTerm, ...props }) => {
  // Fetch data from API
  const terms: API.Term.GET.AllData = [];
  const { data: classes } = useSWR<API.Result<API.Class.GET.AllData>>("/api/classes");
  const { data: rawSubjects } = useSWR<API.Result<API.Class.GET.Subjects>>(
    props.class && `/api/classes/${props.class}/subjects`
  );

  const subjects = useMemo(() => {
    if (!rawSubjects?.success || rawSubjects.data.length < 1) return [];

    return rawSubjects.data
      .map((subject) => {
        if (subject.__type === "base")
          return {
            _id: subject._id,
            name: subject.name.long,
            mandatory: subject.mandatory,
          };

        return subject.divisions.map((division) => ({
          _id: division._id,
          name: `${subject.name.long}  (${division.name.long})`,
          mandatory: subject.mandatory,
        }));
      })
      .flat();
  }, [rawSubjects]);

  function classChange(val: string) {
    props.updateClass(val);
    updateSubjects([]);
  }

  function checkedChange(checked: boolean, id: string) {
    if (checked) return updateSubjects([...props.subjects, id]);
    updateSubjects(props.subjects.filter((sub) => sub !== id));
  }

  useIsomorphicLayoutEffect(() => {
    if (!props.term && terms.length) updateTerm(String(terms[0]._id));
  }, [props.term, terms, updateTerm]);

  useIsomorphicLayoutEffect(() => {
    if (props.class || !classes?.success || classes.data.length < 1) return;
    props.updateClass(String(classes.data[0]._id));
  }, [classes, props]);

  useIsomorphicLayoutEffect(() => {
    if (props.subjects.length > 0) return;
    updateSubjects(subjects.filter((d) => d.mandatory).map((subject) => String(subject._id)));
  }, [props.subjects.length, subjects, updateSubjects]);

  return (
    <Fragment>
      <div className="grid w-full gap-[inherit] md:grid-cols-[repeat(2,max-content)]">
        <Select required label="Term" value={props.term} onValueChange={updateTerm}>
          {terms.map((item) => (
            <Select.Item key={String(item._id)} value={String(item._id)}>
              {item.name.long}
            </Select.Item>
          ))}
        </Select>
        <Select required label="Class" value={props.class} onValueChange={classChange}>
          {classes?.success &&
            classes.data.map((item) => (
              <Select.Item key={String(item._id)} value={String(item._id)}>
                {item.name.long}
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

type AcademicRecordProps = {
  term: string;
  class: string;
  disabled: boolean;
  subjects: string[];
  updateTerm(value: string): void;
  updateClass(value: string): void;
  updateSubjects(value: string[]): void;
};
