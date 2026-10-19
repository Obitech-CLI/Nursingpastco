import { Settings2 } from "lucide-react";
import Link from "next/link";
import { AddContentsForm } from "./Form";

export default function Page() {
  return (
    <main>
      <h2>add contents</h2>
      <Link href="/admin/manage/contents/modify">
        <Settings2 />
        modify
      </Link>
      <AddContentsForm />
    </main>
  );
}
