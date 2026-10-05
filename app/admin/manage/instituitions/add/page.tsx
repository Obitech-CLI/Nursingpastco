import { Admin } from "@/app/lib/admin";
import Link from "next/link";
import { AddForm } from "./Form";
import { Settings2 } from "lucide-react";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>add institution</h2>
      <Link href="/admin/manage/instituitions/modify">
        <Settings2 />
        modify
      </Link>
      <AddForm />
    </main>
  );
}
