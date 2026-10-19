import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import Contents from "./Contents";
import "./modify.css";

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
      <h2>Modify Contents</h2>
      <Link href="/admin/manage/contents/add">
        <Plus />
        add
      </Link>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading contents...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Contents searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
