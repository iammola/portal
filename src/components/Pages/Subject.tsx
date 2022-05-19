import { Input, Users } from "components/Form";

export const DivisionSubjectFields: React.FC<DivisionSubjectFieldsProps> = ({ name, teachers, updateDivision }) => {
  return (
    <div className="space-y-4">
      <div className="flex w-full items-start justify-start gap-3">
        <div className="w-2/3">
          <Input required value={name.long} onChange={(long) => updateDivision({ name: { ...name, long } })}>
            Name
          </Input>
        </div>
        <div className="w-1/3">
          <Input required value={name.short} onChange={(short) => updateDivision({ name: { ...name, short } })}>
            Alias
          </Input>
        </div>
      </div>
      <Users required value={teachers} onChange={(teachers) => updateDivision({ teachers })}>
        Teachers
      </Users>
    </div>
  );
};

type DivisionSubjectFieldsProps = {
  teachers: string;
  removeDivision(): void;
  name: Schemas.Subject.DivisionSchema["name"];
  updateDivision(value: Utils.OneKey<Pick<DivisionSubjectFieldsProps, "teachers" | "name">>): void;
};
