import { Suspense } from "react";
import Contents from "./Contents";

export default function Page() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Contents />
    </Suspense>
  );
}
