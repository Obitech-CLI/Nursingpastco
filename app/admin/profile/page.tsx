import { Suspense } from "react";
import { AdminProfile } from "./Profile";

export default function Page() {
  return (
    <main>
      <h2>admin profile</h2>
      <Suspense fallback={<p>loading profile...</p>}>
        <AdminProfile />
      </Suspense>
    </main>
  );
}
