import { Suspense } from "react";
import TextBooks from "./TextBooks";
import { ClipLoader } from "react-spinners";
import "./textbooks.css";

export default function Page() {
  return (
    <main className="nursing-textbooks">
      <h2>nursing textbooks</h2>
      <h3>
        explore a collection of nursing textbooks and access study materials
        covering essential nursing subjects.
      </h3>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading textbooks...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <TextBooks />
      </Suspense>
    </main>
  );
}
