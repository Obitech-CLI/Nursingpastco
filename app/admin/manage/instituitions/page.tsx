import { Admin } from "@/app/lib/admin";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { InstitutionsCount } from "./Count";
import { ClipLoader } from "react-spinners";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Institutions</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading..</p>
            <ClipLoader size={30} color="var(--bg-txt)" />
          </div>
        }
      >
        <InstitutionsCount />
      </Suspense>
      <nav>
        <Link href="/admin/manage/instituitions/add">
          <Plus size={30} />
          add instituitions
        </Link>
        <Link href="/admin/manage/instituitions/modify">
          <Settings size={30} />
          modify instituitions
        </Link>
      </nav>
    </main>
  );
}
