import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import PastQuestions from "./PastQuestions";
import Link from "next/link";
import { Plus } from "lucide-react";
import "./modify.css";
import { ClipLoader } from "react-spinners";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    course?: string;
    level?: string;
  }>;
}) {
  await Admin();
  return (
    <main>
      <h2>Modify PastQuestions</h2>
      <Link href="/admin/manage/pastQuestions/add">
        <Plus />
        add
      </Link>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading pastQuestions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <PastQuestions searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
