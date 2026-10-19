import { Suspense } from "react";
import Categories from "./Categories";
import { ClipLoader } from "react-spinners";

export default function Page() {
  return (
    <main>
      <h2>modify news&updates categories</h2>
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
