import { Admin } from "@/app/lib/admin";
import Link from "next/link";
import { Suspense } from "react";
import { PastQuestionsCount } from "./Count";
import { Plus, Settings } from "lucide-react";
import { ClipLoader } from "react-spinners";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage PastQuestions</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading..</p>
            <ClipLoader size={30} color="var(--bg-txt)" />
          </div>
        }
      >
        <PastQuestionsCount />
      </Suspense>
      <nav>
        <Link href="/admin/manage/pastQuestions/add">
          <Plus />
          add pastQuestions
        </Link>
        <Link href="/admin/manage/pastQuestions/modify">
          <Settings />
          modify pastQuestions
        </Link>
      </nav>
    </main>
  );
}
