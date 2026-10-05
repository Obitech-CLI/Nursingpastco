import { getCourses } from "@/app/lib/courses";
import { ModifyCourse } from "./Modify";
import { RetryButton } from "@/app/ui/Retry";

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
    <div className="courses">
      {res.courses && (
        <>
          <h2>instituitions</h2>
          {res.courses.length > 0 && (
            <>
              {res.courses.map((course) => (
                <ModifyCourse key={course.id} course={course} />
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
