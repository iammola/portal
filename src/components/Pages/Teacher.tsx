import { Checkbox } from "components/Form";

export const ClassTeacher: React.FC<ClassTeacherProps> = (props) => {
  // Import data from API
  const classes: API.Class.GET.AllData = [];

  return (
    <div className="flex flex-wrap items-center justify-start gap-5">
      {classes.map((item) => (
        <Checkbox
          key={String(item._id)}
          checked={props.selected.includes(String(item._id))}
          onCheckedChange={(checked) =>
            props.updateSelected(
              checked
                ? [...new Set([...props.selected, String(item._id)])]
                : props.selected.filter((subject) => subject !== String(item._id))
            )
          }
        >
          {item.name.long}
        </Checkbox>
      ))}
    </div>
  );
};

type ClassTeacherProps = {
  selected: string[];
  updateSelected(value: string[]): void;
};
