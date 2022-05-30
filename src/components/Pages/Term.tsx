import { Input } from "components/Form";

export const CreateSession: React.FC<CreateSessionProps> = ({ name, onValueChange }) => {
  return (
    <div className="flex w-full items-start justify-start gap-3">
      <div className="w-2/3">
        <Input required value={name.long} onValueChange={(long) => onValueChange({ ...name, long })}>
          Session Name
        </Input>
      </div>
      <div className="w-1/3">
        <Input required value={name.short} onValueChange={(short) => onValueChange({ ...name, short })}>
          Session Alias
        </Input>
      </div>
    </div>
  );
};

type CreateSessionProps = {
  onValueChange(val?: Schemas.Session.Schema["name"]): void;
} & Pick<Schemas.Session.Schema, "name">;
