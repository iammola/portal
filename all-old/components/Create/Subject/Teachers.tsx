import Email, { Value } from "./components/Form/Email";

const Teachers: Teachers = ({ onChange, values = [] }) => {
  return (
    <Email className="flex h-full flex-col space-y-2">
      <Email.Label className="text-slate-800 text-sm font-medium">Teachers</Email.Label>
      <Email.Field
        values={values}
        userType="teacher"
        onChange={onChange}
        className="border-slate-200 focus:ring-blue-400 flex w-full grow flex-row flex-wrap justify-start gap-x-3 gap-y-2 rounded-lg border bg-white px-3 py-[17px] ring-2 ring-transparent focus:border-transparent focus:outline-none"
      />
    </Email>
  );
};

export type TeachersProps = {
  values?: Value[];
  onChange(v: Value[]): void;
};

type Teachers = React.FC<TeachersProps>;

export default Teachers;
