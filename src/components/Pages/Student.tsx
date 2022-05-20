import { Fragment } from "react";

import { useIsomorphicLayoutEffect } from "hooks";
import { Checkbox, Select } from "components/Form";

export const AcademicRecord: React.FC<AcademicRecordProps> = ({ disabled, updateSubjects, updateTerm, ...props }) => {
  // Fetch data from API
  const terms: API.Term.GET.AllData = [];
  const classes: API.Class.GET.AllData = [];
  const subjects: API.Class.GET.Subjects["subjects"] = [];

  function classChange(val: string) {
    props.updateClass(val);
    updateSubjects([]);
  }

  useIsomorphicLayoutEffect(() => {
    if (!props.term && terms.length) updateTerm(String(terms[0]._id));
    if (!props.class && classes.length) props.updateClass(String(classes[0]._id));
  }, [classes, props, terms, updateTerm]);

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
          {classes.map((item) => (
            <Select.Item key={String(item._id)} value={String(item._id)}>
              {item.name.long}
            </Select.Item>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-5">
        {subjects.map((item) => (
          <Checkbox
            disabled={disabled}
            key={String(item._id)}
            checked={props.subjects.includes(String(item._id))}
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
