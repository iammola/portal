import Field from "./Field";

const Date: Date = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Date.Field = Field;

Date.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Date extends React.FC<{ className: string }> {
  Field: Field;
  Label: React.FC<{ className: string }>;
}

export default Date;
