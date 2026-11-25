import { Suspense } from "react";
import PastQuestions from "./PastQuestions";
import { SelectInstituition } from "./SelectInstituitions";
import { CoursesSkeleton } from "./Skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
  }>;
}) {
  const { instituition } = await searchParams;
  return (
    <main>
      <h2>nursing midwifery pastQuestions</h2>
      <SelectInstituition instituition={instituition} />
      <Suspense fallback={<CoursesSkeleton />}>
        <PastQuestions searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
