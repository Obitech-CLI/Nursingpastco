import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import News from "./News";
import "./news.css";

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
      <h2>Modify News&Updates</h2>
      <Link href="/admin/manage/news&updates/add">
        <Plus />
        add
      </Link>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading news&updates...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <News searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
