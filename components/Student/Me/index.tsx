import dynamic from "next/dynamic";

import type { Tab } from "pages/me";
import type { FunctionComponent } from "react";

const MyDetails = dynamic(() => import("./MyDetails"));

const StudentMe: FunctionComponent<{ activeTab: Tab }> = ({ activeTab }) => {
    return <>{activeTab === "My details" && <MyDetails />}</>;
};

export default StudentMe;
