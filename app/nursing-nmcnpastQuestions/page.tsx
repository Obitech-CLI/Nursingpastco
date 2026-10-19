import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import NMCNs from "./NMCNs";

export default function Page() {
  return (
    <main>
      <h2>nursing nmcn pastquestions</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading nmcn questions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <NMCNs />
      </Suspense>
    </main>
  );
}
