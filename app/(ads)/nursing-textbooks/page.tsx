import { Suspense } from "react";
import TextBooks from "./TextBooks";
import { ClipLoader } from "react-spinners";
import "./textbooks.css";
import { TextbooksSkeleton } from "./Skeleton";

export default function Page() {
  return (
    <main className="nursing-textbooks">
      <h2>nursing textbooks</h2>
      <h3>
        explore a collection of nursing textbooks and access study materials
        covering essential nursing subjects.
      </h3>
      <Suspense fallback={<TextbooksSkeleton />}>
        <TextBooks />
      </Suspense>
    </main>
  );
}
