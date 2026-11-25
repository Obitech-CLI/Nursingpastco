import { getCourses } from "@/app/lib/courses";
import { Course } from "./Course";
import styles from "./courses.module.css";
import { RetryButton } from "../../ui/Retry";
import { CourseType } from "../../types/types";
import { Pagination } from "./Pagination";

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
    page: string;
  }>;
}) {
  const { instituition, level, page } = await searchParams;
  const res: Type = await getCourses(instituition, level, page);
  return (
    <div className={styles.courses}>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}

      {res.courses && (
        <>
          {res.courses.length > 0 && (
            <>
              {!instituition && !level ? (
                <div>
                  <h4>all courses</h4>
                </div>
              ) : null}
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
          <Pagination ppage={page} />
        </>
      )}
    </div>
  );
}
