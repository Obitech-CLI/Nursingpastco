import { Admin } from "@/app/lib/admin";
import AddForm from "./Form";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>add midwifery pastQuestions</h2>
      <AddForm />
    </main>
  );
}
