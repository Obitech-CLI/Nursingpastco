import { Admin } from "@/app/lib/admin";
import { Plus, Settings, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>manage news&updates</h2>
      <nav>
        <Link href="/admin/manage/news&updates/add-categories">
          <Plus />
          add news&updates categories
        </Link>
        <Link href="/admin/manage/news&updates/add">
          <Plus />
          add news&updates
        </Link>
        <Link href="/admin/manage/news&updates/modify-categories">
          <Settings2 />
          modify news&updates categories
        </Link>
        <Link href="/admin/manage/news&updates/modify">
          <Settings2 />
          modify news&updates
        </Link>
      </nav>
    </main>
  );
}
