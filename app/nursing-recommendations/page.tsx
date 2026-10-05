import { Suspense } from "react";
import Recommendations from "./Recommendations";

export default function Page() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Recommendations />
    </Suspense>
  );
}
