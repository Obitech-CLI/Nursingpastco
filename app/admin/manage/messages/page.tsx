import { Admin } from "@/app/lib/admin";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import Messages from "./Messages";
import "./messages.css";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>contact messages</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading messages..</p>
            <ClipLoader size={30} color="var(--bg-txt)" />
          </div>
        }
      >
        <Messages />
      </Suspense>
    </main>
  );
}
