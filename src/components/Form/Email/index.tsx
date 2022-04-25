import Field from "./Field";

const Email: Email = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Email.Field = Field;

Email.Label = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

interface Email extends React.FC<{ className?: string }> {
  Field: Field;
  Label: React.FC<{ className: string }>;
}

export default Email;
export type { Value } from "./Badge";
