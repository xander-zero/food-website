import { UserTable } from "src/template/User";
import { PanelLayout } from "src/layout/PanelLayout";

export default function User() {
  return <UserTable />;
}

User.getLayout = function (page) {
  return <PanelLayout>{page}</PanelLayout>;
};
