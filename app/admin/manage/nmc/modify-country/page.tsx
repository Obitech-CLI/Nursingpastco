import { Suspense } from "react";
import Countries from "./Countries";

export default function Page() {
  return (
    <main>
      <h3>modify nmc countries</h3>
      <Suspense>
        <Countries />
      </Suspense>
    </main>
  );
}
