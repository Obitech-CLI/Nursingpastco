import { getInstituitions } from "@/app/lib/instituitions";
import { InstitutionType } from "./modify/Institutions";

type Type = {
  instituitions?: InstitutionType[];
  error?: string;
};

export async function InstitutionsCount() {
  const res: Type = await getInstituitions();
  return (
    <h3
      style={{
        boxShadow: "var(--box-shadow)",
        padding: "1rem 2rem",
        borderRadius: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          backgroundColor: "var(--color-1)",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "50px",
        }}
      >
        total instituitions
      </span>
      {res.instituitions?.length || 0}
    </h3>
  );
}
