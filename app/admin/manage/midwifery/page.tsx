import { Admin } from "@/app/lib/admin";
import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Midwifery PastQuestions</h2>
      <nav className="admin">
        <Link href="/admin/manage/midwifery/add-courses">
          <Plus size={50} />
          add courses
        </Link>
        {/*<Link href="/admin/manage/midwifery/modify-courses">
          <Settings2 size={50} />
          modify courses
        </Link>*/}
        <Link href="/admin/manage/midwifery/add-pastQuestions">
          <Plus size={50} />
          add PastQuestions
        </Link>
        {/*<Link href="/admin/manage/midwifery/modify-courses">
          <Settings2 size={50} />
          modify PastQuestions
        </Link>*/}
      </nav>
    </main>
  );
}
