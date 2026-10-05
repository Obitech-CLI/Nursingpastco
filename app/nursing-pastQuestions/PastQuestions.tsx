import { getPastQuestions } from "@/app/lib/pastQuestions";
import { PastQuestion } from "./PastQuestion";

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
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
        </div>
      )}
      {res.pastQuestions && (
        <>
          <h3>PastQuestions</h3>
          {res.pastQuestions.length > 0 && (
            <>
              {res.pastQuestions.map((pastQuestion) => (
                <PastQuestion
                  key={pastQuestion.id}
                  pastQuestion={pastQuestion}
                  course={course}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
