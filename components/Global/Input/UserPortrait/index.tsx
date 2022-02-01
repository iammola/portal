import { FunctionComponent } from "react";

const UserPortrait: UserPortrait = () => {
  return <></>;
};

type UserPortrait = FunctionComponent<{
  value?: File | string;
  onChange(value: File): void;
}>;

export default UserPortrait;
