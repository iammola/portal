import Teachers, { TeachersProps } from "./Teachers";

const BaseSubject: BaseSubject = ({ teachers }) => {
  return (
    <div className="h-32">
      <Teachers {...teachers} />
    </div>
  );
};

type BaseSubject = React.FC<{ teachers: TeachersProps }>;

export default BaseSubject;
