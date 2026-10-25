import Link from "next/link";
import { AddCategoryForm } from "./Form";
import { Settings2 } from "lucide-react";

export default function Page() {
  return (
    <main>
      <h2>add news&updates categories</h2>
      <Link href="/admin/manage/news&updates/modify-categories">
        <Settings2 />
        modify
      </Link>
      <AddCategoryForm />
    </main>
  );
}
