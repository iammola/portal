import { FunctionComponent } from "react";

import { Item, List } from "./Items";

export const Menu: FunctionComponent = () => {
  const items = [
    { href: "", title: "Students" },
    { href: "", title: "Teachers" },
    { href: "", title: "Parents" },
  ];

  return (
    <div className="w-full grow space-y-2 p-4">
      <Item href="">Attendance Report</Item>
      <List items={items}>People</List>
    </div>
  );
};
