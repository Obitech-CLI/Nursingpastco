import { Admin } from "@/app/lib/admin";
import { CreateForm } from "./Form";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h1>create admin</h1>
      <CreateForm />
    </main>
  );
}
