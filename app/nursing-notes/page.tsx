import { Suspense } from "react";
import Notes from "./Notes";
import { ClipLoader } from "react-spinners";

export default function Page() {
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
