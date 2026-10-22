import { Suspense } from "react";
import Contents from "./Contents";
import SelectCategories from "./Categories";
import "./contents.css";
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
    <main className="nursing-contents">
      <h2>nursing contents</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading contents...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <SelectCategories />
        <Contents searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
