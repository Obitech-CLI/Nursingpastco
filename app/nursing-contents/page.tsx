import { Suspense } from "react";
import Contents from "./Contents";
import SelectCategories from "./Categories";
import "./contents.css";
import { ClipLoader } from "react-spinners";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  return (
    <main className="nursing-contents">
      <h2>nursing contents</h2>
      <SelectCategories />
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
