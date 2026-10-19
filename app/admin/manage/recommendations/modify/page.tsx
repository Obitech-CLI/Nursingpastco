import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import "./modify.css";
import { ClipLoader } from "react-spinners";
import Recommendations from "./Recommendations";
import "./recommendations.css";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  await Admin();
  return (
    <main>
      <h2>Modify Recommendations</h2>
      <Link href="/admin/manage/recommendations/add">
        <Plus />
        add
      </Link>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading recommendations...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Recommendations searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
