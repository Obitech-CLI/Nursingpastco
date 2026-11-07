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
      <h2>nursing news&updates</h2>
      <Suspense>
        <SelectCategories />
      </Suspense>
      <h3 style={{ color: "var(--bg-txt)" }}>
        stay informed with the latest nursing news, professional updates, career
        opportunities and important developments in nursing profession.
      </h3>
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
