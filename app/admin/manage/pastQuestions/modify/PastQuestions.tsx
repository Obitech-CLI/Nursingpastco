import { getPastQuestions } from "@/app/lib/pastQuestions";
import { ModifyPastQuestion } from "./Modify";
import { RetryButton } from "@/app/ui/Retry";

export interface PastQuestionType {
  id: number;
  instituition: string;
  course: string;
  level: string;
  title: string;
  pdf: any;
}

type Type = {
  pastQuestions?: PastQuestionType[];
  error?: string;
};

export default async function PastQuestions({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    course?: string;
    level?: string;
  }>;
}) {
  const { instituition, course, level } = await searchParams;
  const res: Type = await getPastQuestions(instituition, course, level);
  return (
    <div className="pastQuestions">
      {res.pastQuestions && (
        <>
          <h2>PastQuestions</h2>
          {res.pastQuestions.length > 0 && (
            <>
              <div>
                <h3>{res.pastQuestions[0]?.instituition}</h3>
                <h3>{res.pastQuestions[0]?.level}</h3>
              </div>
              {res.pastQuestions.map((pastQuestion) => (
                <ModifyPastQuestion
                  key={pastQuestion.id}
                  pastQuestion={pastQuestion}
                />
              ))}
            </>
          )}
        </>
      )}

      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
    </div>
  );
}
