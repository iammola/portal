import Options from "./Options";

const SubjectType: SubjectType = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

SubjectType.Options = Options;
SubjectType.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface SubjectType extends React.FC<{ className: string }> {
  Options: Options;
  Label: React.FC<{ className: string }>;
}

export default SubjectType;
