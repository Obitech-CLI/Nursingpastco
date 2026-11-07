import { getNMCPastQuestions } from "@/app/lib/nmc";
import { NMCPastQuestionType } from "@/app/types/types";
import { RetryButton } from "@/app/ui/Retry";
import PastQuestion from "./PastQuestion";

type Type = {
  error?: string;
  pastQuestions?: NMCPastQuestionType[];
};
export default async function PastQuestions({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
    course?: string;
  }>;
}) {
  const { country, course } = await searchParams;
  const res: Type = await getNMCPastQuestions(country, course);
  return (
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}

      {res.pastQuestions?.length && (
        <div>
          <h3>{res.pastQuestions[0].country}</h3>
          <h3>{res.pastQuestions[0].course}</h3>
          {res.pastQuestions.map((pastQuestion) => (
            <PastQuestion key={pastQuestion.id} pastQuestion={pastQuestion} />
          ))}
        </div>
      )}
    </div>
  );
}
