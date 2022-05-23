import { Fragment } from "react";
import useSWR from "swr";

import { useIsomorphicLayoutEffect } from "hooks";
import { Checkbox, Select } from "components/Form";

export const AcademicRecord: React.FC<AcademicRecordProps> = ({ disabled, updateSubjects, updateTerm, ...props }) => {
  // Fetch data from API
  const terms: API.Term.GET.AllData = [];
  const { data: classes } = useSWR<API.Result<API.Class.GET.AllData>>("/api/classes");
  const { data: subjects } = useSWR<API.Result<API.Class.GET.Subjects>>(
    props.class && `/api/classes/${props.class}/subjects`
  );

  function classChange(val: string) {
    props.updateClass(val);
    updateSubjects([]);
  }

  useIsomorphicLayoutEffect(() => {
    if (!props.term && terms.length) updateTerm(String(terms[0]._id));
  }, [props.term, terms, updateTerm]);

  useIsomorphicLayoutEffect(() => {
    if (props.class || !classes?.success || classes.data.length < 1) return;
    props.updateClass(String(classes.data[0]._id));
  }, [classes, props]);

  useIsomorphicLayoutEffect(() => {
    if (!subjects?.success) return;
    updateSubjects(subjects.data.filter((d) => d.mandatory).map((subject) => String(subject._id)));
  }, [subjects, updateSubjects]);

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
        {subjects?.success &&
          subjects.data.map((item) => (
            <Checkbox
              key={String(item._id)}
              disabled={item.mandatory || disabled}
              checked={item.mandatory || props.subjects.includes(String(item._id))}
              onCheckedChange={(checked) =>
                updateSubjects(
                  checked
                    ? [...new Set([...props.subjects, String(item._id)])]
                    : props.subjects.filter((subject) => subject !== String(item._id))
                )
              }
            >
              {item.name.long}
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
