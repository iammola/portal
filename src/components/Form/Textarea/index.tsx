import Field from "./Field";

const Textarea: Textarea = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Textarea.Field = Field;

Textarea.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Textarea extends React.FC<CP<{ className?: string }>> {
  Field: Field;
  Label: React.FC<CP<{ className: string }>>;
}

export default Textarea;
