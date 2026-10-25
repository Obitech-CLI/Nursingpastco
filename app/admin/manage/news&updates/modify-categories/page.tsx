import { Suspense } from "react";
import Categories from "./Categories";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <main>
      <h2>modify news&updates categories</h2>
      <Link href="/admin/manage/news&updates/add-categories">
        <Plus />
        add categories
      </Link>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading categories...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Categories />
      </Suspense>
    </main>
  );
}
