import { redirect } from "next/navigation";
import { Suspense } from "react";
import PastQuestions from "./PastQuestions";
import Image from "next/image";
import "./style.css";
import { CoursesSkeleton } from "./Skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
    banner?: string;
    description?: string;
  }>;
}) {
  const { country, banner, description } = await searchParams;

  if (!country || !banner || !description) redirect("/nursing-council");
  return (
    <main className="nmc-pastQuestions">
      <h2>nmc{country.at(0)} Past Questions</h2>
      <Image alt="" src={banner} width={400} height={200} loading="eager" />
      <h4>{description}</h4>
      <Suspense fallback={<CoursesSkeleton />}>
        <PastQuestions searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
