import { LogoutAdmin } from "./action";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={LogoutAdmin}
      style={{
        padding: "1rem 2rem",
      }}
    >
      logout
    </button>
  );
}
