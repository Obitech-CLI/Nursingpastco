import { Admin } from "@/app/lib/admin";
import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Textbooks</h2>
      <nav>
        <Link href="/admin/manage/textbooks/add">
          <Plus size={30} />
          add textbooks
        </Link>
        {/*}
        <Link href="/admin/manage/textbooks/modify">
          <Settings2 size={30} />
          modify textbooks
        </Link>
        */}
      </nav>
    </main>
  );
}
