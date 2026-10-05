import AdminDashboard from "./Dashboard";
import { Admin } from "@/app/lib/admin";

export default async function Page() {
  await Admin();
  return <AdminDashboard />;
}
