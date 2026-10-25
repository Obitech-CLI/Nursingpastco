import { getCourses } from "@/app/lib/courses";
import { Course } from "./Course";
import styles from "./courses.module.css";
import { RetryButton } from "../../ui/Retry";
import { CourseType } from "../../types/types";

type Type = {
  courses?: CourseType[];
  error?: string;
};

export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    level?: string;
  }>;
}) {
  const { instituition, level } = await searchParams;
  const res: Type = await getCourses(instituition, level);
  return (
    <div className={styles.courses}>
      {res.courses && (
        <>
          {res.courses.length > 0 && (
            <>
              {instituition && level ? (
                <div>
                  <h4>{res.courses[0]?.instituition}</h4>
                  <h4>{res.courses[0]?.level}</h4>
                  <h4>all courses</h4>
                </div>
              ) : null}
              {instituition && !level ? (
                <div>
                  <h4>{res.courses[0]?.instituition}</h4>
                  <h4>all courses</h4>
                </div>
              ) : null}
              {!instituition && level ? (
                <div>
                  <h4>{res.courses[0]?.level}</h4>
                  <h4>all courses</h4>
                </div>
              ) : null}
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
