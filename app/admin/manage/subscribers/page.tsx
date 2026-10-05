import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import Subscribers from "./Subscribers";
import { ClipLoader } from "react-spinners";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
  }>;
}) {
  await Admin();
  return (
    <main>
      <h2>newsletter subscribers</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading subscribers..</p>
            <ClipLoader size={30} color="var(--bg-txt)" />
          </div>
        }
      >
        <Subscribers searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
