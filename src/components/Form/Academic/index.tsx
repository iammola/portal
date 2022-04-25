import { FunctionComponent } from "react";

import { Class, Subjects } from "./Components";

const Academic: Academic = ({ handleClassChange, handleSubjectsChange, subjects, ...props }) => {
  return (
    <div className="space-y-3">
      <div className="w-1/4">
        <Class
          value={props.class}
          onChange={handleClassChange}
        />
      </div>
      <Subjects
        values={subjects}
        selectedClass={props.class}
        onChange={handleSubjectsChange}
      />
    </div>
  );
};

type Academic = FunctionComponent<{
  class: string;
  subjects: string[];
  handleClassChange(v: string): void;
  handleSubjectsChange(v: string[]): void;
}>;

export default Academic;
