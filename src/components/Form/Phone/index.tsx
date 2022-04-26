import Field from "./Field";

const Phone: Phone = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Phone.Field = Field;

Phone.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Phone extends React.FC<CP<{ className: string }>> {
  Field: Field;
  Label: React.FC<CP<{ className: string }>>;
}

export default Phone;
