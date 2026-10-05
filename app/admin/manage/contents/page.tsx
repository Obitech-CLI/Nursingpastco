import { Admin } from "@/app/lib/admin";
import ManageContents from "./Manage";

export default async function Page() {
  await Admin();
  return <ManageContents />;
}
