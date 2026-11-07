import { Settings2 } from "lucide-react";
import Link from "next/link";
import { AddRecommendationsForm } from "./Form";

export default function Page() {
  return (
    <main>
      <h2>add recommendations</h2>
      <Link href="/admin/manage/recommendations/modify">
        <Settings2 />
        modify
      </Link>
      <AddRecommendationsForm />
    </main>
  );
}
