import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";
import "../../dashboard/dashboard.css";

export default function Page() {
  return (
    <main>
      <h2>manage nmc past questions</h2>
      <nav className="admin">
        <Link href="/admin/manage/nmc/add-country">
          <Plus size={30} />
          add nmc countries
        </Link>

        <Link href="/admin/manage/nmc/modify-country">
          <Settings2 size={30} />
          modify nmc countries
        </Link>

        <Link href="/admin/manage/nmc/add-course">
          <Plus size={30} />
          add nmc courses
        </Link>

        <Link href="/admin/manage/nmc/modify-course">
          <Settings2 size={30} />
          modify nmc courses
        </Link>

        <Link href="/admin/manage/nmc/add">
          <Plus size={30} />
          add nmc past Question
        </Link>
      </nav>
    </main>
  );
}
