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
  await Admin();
  return (
    <main className="nursing-news">
      <h2>nursing news&updates</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading news&updates...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <SelectCategories />
        <News searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
