import { Admin } from "@/app/lib/admin";
import Link from "next/link";
import { Plus, Settings, Settings2 } from "lucide-react";
import "../../dashboard/dashboard.css";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage PastQuestions</h2>
      <nav className="admin">
        <Link href="/admin/manage/pastQuestions/add">
          <Plus size={50} />
          add pastQuestions
        </Link>
        <Link href="/admin/manage/pastQuestions/modify">
          <Settings2 size={50} />
          modify pastQuestions
        </Link>
      </nav>
    </main>
  );
}
