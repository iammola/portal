import { FunctionComponent } from "react";

type Main = FunctionComponent<{
    values: {
        _id: string;
        value: string;
    }[];
}>;

const Main: Main = () => {
    return <div contentEditable suppressContentEditableWarning />;
};

export default Main;
