import { Settings2 } from "lucide-react";
import Link from "next/link";
import { AddNewsForm } from "./Form";

export default function Page() {
  return (
    <main>
      <h2>add news&updates</h2>
      <Link href="/admin/manage/news&updates/modify">
        <Settings2 />
        modify
      </Link>
      <AddNewsForm />
    </main>
  );
}
