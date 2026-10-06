import { Admin } from "@/app/lib/admin";
import Instituitions from "./Institutions";
import { Suspense } from "react";
import "./modify.css";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { ResolveUpdate } from "./Resolve-Update";
import { ResolveDelete } from "./Resolve-Delete";

export default async function Page() {
  await Admin();
  return (
    <main className="modify">
      <h2>Modify Institutions</h2>
      <Link href="/admin/manage/instituitions/add">
        <Plus />
        add
      </Link>
      <div className="resolve">
        <ResolveUpdate />
        <ResolveDelete />
      </div>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading instituitions..</p>
            <ClipLoader size={30} color="var(--bg-txt)" />
          </div>
        }
      >
        <Instituitions />
      </Suspense>
    </main>
  );
}
