import { Admin } from "@/app/lib/admin";
import Link from "next/link";
import { Plus, Settings2 } from "lucide-react";
import "../../dashboard/dashboard.css";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>manage recommendations</h2>
      <nav className="admin">
        <Link href="/admin/manage/recommendations/add-categories">
          <Plus size={50} />
          add recommendations categories
        </Link>
        <Link href="/admin/manage/recommendations/add">
          <Plus size={50} />
          add recommendations
        </Link>
        <Link href="/admin/manage/recommendations/modify-categories">
          <Settings2 size={50} />
          modify recommendations categories
        </Link>
        <Link href="/admin/manage/recommendations/modify">
          <Settings2 size={50} />
          modify recommendations
        </Link>
      </nav>
    </main>
  );
}
