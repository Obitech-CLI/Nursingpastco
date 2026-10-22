import { Suspense } from "react";
import SelectCategories from "./Categories";
import Recommendations from "./Recommendations";
import { ClipLoader } from "react-spinners";
import "./recommendations.css";
import type { Metadata } from "next";
import { Admin } from "../lib/admin";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  await Admin();
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
