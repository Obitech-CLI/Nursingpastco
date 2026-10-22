import { Suspense } from "react";
import Notes from "./Notes";
import { ClipLoader } from "react-spinners";
import type { Metadata } from "next";
import { Admin } from "../lib/admin";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>nursing notes</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading notes...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Notes />
      </Suspense>
    </main>
  );
}
