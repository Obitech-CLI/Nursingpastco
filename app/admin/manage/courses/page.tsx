import { Admin } from "@/app/lib/admin";
import { Plus, Settings, Settings2 } from "lucide-react";
import Link from "next/link";
import "../../dashboard/dashboard.css";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Courses</h2>
      <nav className="admin">
        <Link href="/admin/manage/courses/add">
          <Plus size={50} />
          add courses
        </Link>
        <Link href="/admin/manage/courses/modify">
          <Settings2 size={50} />
          modify courses
        </Link>
      </nav>
    </main>
  );
}
