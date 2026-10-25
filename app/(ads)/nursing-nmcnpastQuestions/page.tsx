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
      <h1>nmcn pastquestions</h1>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading pastquestions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <NMCNs searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
