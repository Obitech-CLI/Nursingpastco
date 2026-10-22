import { Suspense } from "react";
import { AdminProfile } from "./Profile";
import { ClipLoader } from "react-spinners";

export default function Page() {
  return (
    <main>
      <h2>admin profile</h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading profile...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <AdminProfile />
      </Suspense>
    </main>
  );
}
