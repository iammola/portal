import { Fragment } from "react";

import { Checkbox, Select } from "components/Form";

export const AcademicRecord: React.FC<AcademicRecordProps> = ({ updateSubjects, updateTerm, ...props }) => {
  const terms: API.Term.GET.AllData = [];
  const classes: API.Class.GET.AllData["classes"] = [];
  const subjects: API.Class.GET.Subjects["subjects"] = [];

  function handleClassChange(val: string) {
    props.updateClass(val);
    updateSubjects([]);
  }

  return (
    <Fragment>
      <div className="grid w-full gap-[inherit] md:grid-cols-[repeat(2,max-content)]">
        <Select required label="Term" value={props.term || String(terms[0]._id)} onValueChange={updateTerm}>
          {terms.map((item) => (
            <Select.Item key={String(item._id)} value={String(item._id)}>
              {item.name.long}
            </Select.Item>
          ))}
        </Select>
        <Select required label="Class" value={props.class || String(classes[0]._id)} onValueChange={handleClassChange}>
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
  subjects: string[];
  updateTerm(value: string): void;
  updateClass(value: string): void;
  updateSubjects(value: string[]): void;
};
