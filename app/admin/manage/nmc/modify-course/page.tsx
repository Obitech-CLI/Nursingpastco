import { Suspense } from "react";
import Courses from "./Courses";
import { ClipLoader } from "react-spinners";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
  }>;
}) {
  return (
    <main>
      <h2>modify nmc courses</h2>
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
