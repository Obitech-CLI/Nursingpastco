import { LogoutButton } from "./LogoutButton";
import { Nav } from "./Nav";

export default async function AdminDashboard() {
  return (
    <main>
      <h2>admin dashboard</h2>
      <LogoutButton />
      <Nav />
    </main>
  );
}
