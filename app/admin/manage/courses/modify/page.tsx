import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import Courses from "./Courses";
import "./modify.css";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { ResolveUpdate } from "./Resolve-Update";
import { ResolveDelete } from "./Resolve-Delete";

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
    <main className="modify">
      <h2>Modify Courses</h2>
      <Link href="/admin/manage/courses/add">
        <Plus />
        add
      </Link>
      <div>
        <ResolveUpdate />
        <ResolveDelete />
      </div>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading courses...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Courses searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
