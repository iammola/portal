import { FunctionComponent } from "react";

import Email, { Value } from "components/Form/Email";

const Teachers: Teachers = ({ onChange, values = [] }) => {
  return (
    <Email className="flex h-full flex-col space-y-2">
      <Email.Label className="font-medium text-slate-800">Teachers</Email.Label>
      <Email.Field
        values={values}
        userType="teacher"
        onChange={onChange}
        className="flex w-full grow flex-row flex-wrap justify-start gap-x-3 gap-y-2 rounded-lg border border-slate-200 bg-white px-3 py-[17px] ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
      />
    </Email>
  );
};

export type TeachersProps = {
  values?: Value[];
  onChange(v: Value[]): void;
};

type Teachers = FunctionComponent<TeachersProps>;

export default Teachers;
