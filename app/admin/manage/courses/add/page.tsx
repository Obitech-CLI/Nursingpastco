import { Admin } from "@/app/lib/admin";
import { AddForm } from "./Form";
import Link from "next/link";
import { Settings2 } from "lucide-react";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>add course</h2>
      <Link href="/admin/manage/courses/modify">
        <Settings2 />
        modify
      </Link>
      <AddForm />
    </main>
  );
}
