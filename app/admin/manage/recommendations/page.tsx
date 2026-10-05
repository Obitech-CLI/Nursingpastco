import { Admin } from "@/app/lib/admin";
import ManageRecommendations from "./Manage";

export default async function Page() {
  await Admin();
  return <ManageRecommendations />;
}
