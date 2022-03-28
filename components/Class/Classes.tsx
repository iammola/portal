import useSWR from "swr";
import { FunctionComponent, useState } from "react";

import type { ApiResponse } from "types/api";
import type { GetClassesData } from "types/api/classes";

export const Classes: FunctionComponent = () => {
  const [activePage] = useState(0);
  const { data } = useSWR<ApiResponse<GetClassesData>>(`/api/classes?page=${activePage}`);

  return <>{JSON.stringify(data?.data.classes)}</>;
};
