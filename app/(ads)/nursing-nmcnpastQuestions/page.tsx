import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import NMCNs from "./NMCNs";
import "./nmcn.css";
import Image from "next/image";
import banner from "@/public/nmcn-banner.png";

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
      <h2>nmcn pastquestions</h2>
      <Image alt="" src={banner} />
      <h3>
        Whether you're preparing for professional qualifying examinations or
        other nursing assessments, our resources help you study smarter and
        approach your exams with greater confidence.
      </h3>
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
