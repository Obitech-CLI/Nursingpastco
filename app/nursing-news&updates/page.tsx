import { Suspense } from "react";
import NewsUpdates from "./News&Updates";

export default function Page() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <NewsUpdates />
    </Suspense>
  );
}
