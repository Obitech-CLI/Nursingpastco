import { Admin } from "@/app/lib/admin";
import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Notes</h2>
      <nav>
        <Link href="/admin/manage/notes/add">
          <Plus size={30} />
          add notes
        </Link>
        {/*}
        <Link href="/admin/manage/notes/modify">
          <Settings2 size={30} />
          modify notes
        </Link>
        */}
      </nav>
    </main>
  );
}
