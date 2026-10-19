import { Admin } from "@/app/lib/admin";
import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>manage contents</h2>
      <nav>
        <Link href="/admin/manage/contents/add-categories">
          <Plus />
          add contents categories
        </Link>
        <Link href="/admin/manage/contents/add">
          <Plus />
          add contents
        </Link>
        <Link href="/admin/manage/contents/modify-categories">
          <Settings2 />
          modify contents categories
        </Link>
        <Link href="/admin/manage/contents/modify">
          <Settings2 />
          modify contents
        </Link>
      </nav>
    </main>
  );
}
