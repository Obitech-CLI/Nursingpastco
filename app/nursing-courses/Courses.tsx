import { getCourses } from "@/app/lib/courses";
import { Course } from "./Course";
import styles from "./courses.module.css";
import { RetryButton } from "../ui/Retry";

export interface CourseType {
  id: number;
  instituition: string;
  course: string;
  level: string;
}

type Type = {
  courses?: CourseType[];
  error?: string;
};

export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    course?: string;
    level?: string;
  }>;
}) {
  const { instituition, course, level } = await searchParams;
  const res: Type = await getCourses(instituition, course, level);
  return (
    <div className={styles.courses}>
      {res.courses && (
        <>
          {res.courses.length > 0 && (
            <>
              {res.courses.map((course) => (
                <Course key={course.id} course={course} />
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
