import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import NMCNs from "./NMCNs";
import "./nmcn.css";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  return (
    <main className="nursing-nmcn">
      <h2>nursing nmcn pastquestions</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading nmcn questions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <NMCNs searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
