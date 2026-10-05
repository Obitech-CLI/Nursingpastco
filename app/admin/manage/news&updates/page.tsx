import { Admin } from "@/app/lib/admin";
import ManageNewsUpdates from "./Manage";

export default async function Page() {
  await Admin();
  return <ManageNewsUpdates />;
}
