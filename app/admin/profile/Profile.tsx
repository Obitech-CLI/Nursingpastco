import { Admin } from "@/app/lib/admin";
import "./profile.css";
import { LogoutButton } from "../dashboard/LogoutButton";

export async function AdminProfile() {
  const admin = await Admin();
  return (
    <div className="admin-profile">
      <div className="img">{admin?.username.slice(0, 1)}</div>
      <h3>
        <span>username</span>
        {admin?.username}
      </h3>
      <h3>
        <span>email</span>
        {admin?.email}
      </h3>
      <LogoutButton />
    </div>
  );
}
