import { Admin } from "@/app/lib/admin";
import { Plus, Settings, Settings2 } from "lucide-react";
import Link from "next/link";
import "../../dashboard/dashboard.css";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Institutions</h2>
      <nav className="admin">
        <Link href="/admin/manage/instituitions/add">
          <Plus size={50} />
          add instituitions
        </Link>
        <Link href="/admin/manage/instituitions/modify">
          <Settings2 size={50} />
          modify instituitions
        </Link>
      </nav>
    </main>
  );
}
