import { Admin } from "@/app/lib/admin";
import Link from "next/link";
import { Plus, Settings2 } from "lucide-react";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>manage recommendations</h2>
      <nav>
        <Link href="/admin/manage/recommendations/add-categories">
          <Plus />
          add recommendations categories
        </Link>
        <Link href="/admin/manage/recommendations/add">
          <Plus />
          add recommendations
        </Link>
        <Link href="/admin/manage/recommendations/modify-categories">
          <Settings2 />
          modify recommendations categories
        </Link>
        <Link href="/admin/manage/recommendations/modify">
          <Settings2 />
          modify recommendations
        </Link>
      </nav>
    </main>
  );
}
