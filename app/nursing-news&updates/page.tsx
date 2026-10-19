import { Suspense } from "react";
import SelectCategories from "./Categories";
import News from "./News";
import "./news.css";
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
    <main className="nursing-news">
      <h2>nursing news&updates</h2>
      <SelectCategories />
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
