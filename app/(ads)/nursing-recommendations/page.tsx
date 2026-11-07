import { Suspense } from "react";
import SelectCategories from "./Categories";
import Recommendations from "./Recommendations";
import { ClipLoader } from "react-spinners";
import "./recommendations.css";
import { RecommendationsSkeleton } from "./Skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page: string;
  }>;
}) {
  return (
    <main className="nursing-recommendations">
      <h2>nursing recommendations</h2>
      <Suspense>
        <SelectCategories />
      </Suspense>
      <h3 style={{ color: "var(--bg-txt)" }}>
        Discover recommended products, study materials, and essential resources
        for nursing students and professionals.
      </h3>
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations searchParams={searchParams} />
      </Suspense>

      <p>
        The nursing recommendations and resources on Nursing PastCO are provided
        for educational purposes only. Some materials link to external websites,
        whose content, accuracy and availability we do not control. These
        resources are intended to support learning and should not replace formal
        nursing education, professional guidance, clinical supervision or
        approved medical guidelines. Always verify information with reliable
        sources before applying it in clinical practice.
      </p>
    </main>
  );
}
