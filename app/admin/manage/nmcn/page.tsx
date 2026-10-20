import { Admin } from "@/app/lib/admin";
import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage NMCN PastQuestions</h2>
      <nav>
        <Link href="/admin/manage/nmcn/add">
          <Plus size={30} />
          add nmcn
        </Link>
        <Link href="/admin/manage/nmcn/add-category">
          <Plus size={30} />
          add nmcn categories
        </Link>
        {/*}
        <Link href="/admin/manage/nmcn/modify">
          <Settings2 size={30} />
          modify nmcn
        </Link>
        */}
      </nav>
    </main>
  );
}
