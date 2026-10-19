import { Suspense } from "react";
import PastQuestions from "./PastQuestions";
import { SearchInstituition } from "./SearchInstituition";
import { SearchLevel } from "./SearchLevel";
import { SearchCourse } from "./SearchCourse";
import { ClipLoader } from "react-spinners";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    course?: string;
    level?: string;
  }>;
}) {
  const { instituition, level } = await searchParams;
  return (
    <main>
      <h2>Nursing PastQuestions</h2>
      <SearchInstituition instituition={instituition} />
      <SearchLevel level={level} />
      <SearchCourse instituition={instituition} level={level} />
      <Suspense
        fallback={
          <div className="loading">
            <p>loading PastQuestions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <PastQuestions searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
