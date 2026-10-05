import { getInstituitions } from "@/app/lib/instituitions";
import { PastQuestionType } from "./modify/PastQuestions";
import { getPastQuestions } from "@/app/lib/pastQuestions";
import { getPastQuestionsCount } from "@/app/lib/pastQuestionsCount";

type Type = {
  count?: number;
  error?: string;
};

export async function PastQuestionsCount() {
  const res: Type = await getPastQuestionsCount();
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
        total courses
      </span>
      {res.count || 0}
    </h3>
  );
}
