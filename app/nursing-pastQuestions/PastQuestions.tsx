import { getPastQuestions } from "@/app/lib/pastQuestions";
import { PastQuestion } from "./PastQuestion";
import { PastQuestionType } from "../types/types";
import styles from "./pastQuestions.module.css";

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

  console.log(JSON.stringify(res));
  return (
    <div className={styles.pastQuestions}>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
        </div>
      )}
      {res.pastQuestions && (
        <div className="select">
          <h2>PastQuestions</h2>
          {res.pastQuestions.length > 0 && (
            <PastQuestion pastQuestions={res.pastQuestions} course={course} />
          )}
        </div>
      )}
    </div>
  );
}
