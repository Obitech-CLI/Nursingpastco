import { Suspense } from "react";
import TextBooks from "./TextBooks";
import { ClipLoader } from "react-spinners";
import "./textbooks.css";

export default function Page() {
  return (
    <main className="nursing-textbooks">
      <h2>nursing textbooks</h2>
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
