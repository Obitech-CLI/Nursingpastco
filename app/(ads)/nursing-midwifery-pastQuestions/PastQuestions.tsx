import { getPastQuestions } from "@/app/lib/pastQuestions";
import { getMidwiferyCourses } from "../../lib/midwifery";
import styles from "./styles.module.css";
import { PastQuestion } from "./PastQuestion";
import { MidwiferyCoursesType } from "../../types/types";
import { RetryButton } from "../../ui/Retry";

type Type = {
  courses?: MidwiferyCoursesType[];
  error?: string;
};

export default async function PastQuestions({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
  }>;
}) {
  const { instituition } = await searchParams;
  const res: Type = await getMidwiferyCourses(instituition);

  return (
    <div className={styles.pastQuestions}>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.courses?.length && (
        <div className={styles.pastQuestion}>
          <h3>courses</h3>
          {res.courses.map((course) => (
            <PastQuestion course={course} key={course.id} />
          ))}
        </div>
      )}
    </div>
  );
}
