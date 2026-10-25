import { Suspense } from "react";
import SelectCategories from "./Categories";
import News from "./News";
import "./news.css";
import { ClipLoader } from "react-spinners";

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
  return (
    <main className="nursing-news">
      <h1>nursing news&updates</h1>
      <Suspense>
        <SelectCategories />
      </Suspense>
      <h2>
        stay informed with the latest nursing news, professional updates, career
        opportunities and important developments in nursing profession.
      </h2>
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
