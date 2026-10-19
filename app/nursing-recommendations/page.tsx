import { Suspense } from "react";
import SelectCategories from "./Categories";
import Recommendations from "./Recommendations";
import { ClipLoader } from "react-spinners";
import "./recommendations.css";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  return (
    <main className="nursing-recommendations">
      <h2>nursing recommendations</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading recommendations...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <SelectCategories />
        <Recommendations searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
