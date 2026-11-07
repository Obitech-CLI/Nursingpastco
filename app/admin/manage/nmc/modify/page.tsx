import { Suspense } from "react";
import PastQuestions from "./PastQuestions";
import { ClipLoader } from "react-spinners";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
    course?: string;
  }>;
}) {
  return (
    <main>
      <h2>modify nmc pastQuestions</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading nmc past questions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <PastQuestions searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
