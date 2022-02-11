import { FunctionComponent } from "react";

import Email, { Value } from "components/Form/Email";

const Teachers: Teachers = ({ onChange, values }) => {
  return (
    <Email className="space-y-2">
      <Email.Label className="font-medium text-slate-800">Teachers</Email.Label>
      <Email.Field
        values={values}
        userType="teacher"
        onChange={onChange}
        className="flex h-24 w-full grow flex-row flex-wrap justify-start gap-x-3 gap-y-2 rounded-lg border border-slate-200 bg-white px-3 py-[17px] ring-2 ring-transparent focus:border-transparent focus:outline-none focus:ring-blue-400"
      />
    </Email>
  );
};

type Teachers = FunctionComponent<{
  values?: Value[];
  onChange(v: Value[]): void;
};

export default Teachers;
