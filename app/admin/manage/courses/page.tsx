import { Admin } from "@/app/lib/admin";
import { Plus, Settings } from "lucide-react";
import Link from "next/link";
import { CoursesCount } from "./Count";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>Manage Courses</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading...</p>
            <ClipLoader size={30} color="var(--bg-txt)" />
          </div>
        }
      >
        <CoursesCount />
      </Suspense>
      <nav>
        <Link href="/admin/manage/courses/add">
          <Plus size={30} />
          add courses
        </Link>
        <Link href="/admin/manage/courses/modify">
          <Settings size={30} />
          modify courses
        </Link>
      </nav>
    </main>
  );
}
