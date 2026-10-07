import { getCourses } from "@/app/lib/courses";
import { ModifyCourse } from "./Modify";
import { RetryButton } from "@/app/ui/Retry";

export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    level?: string;
  }>;
}) {
  const { instituition, level } = await searchParams;
  const res = await getCourses(instituition, level);
  return (
    <div className="courses">
      {res.courses && (
        <>
          <h2>courses</h2>
          {res.courses.length > 0 && (
            <>
              <div>
                <h3>{res.courses[0].instituition}</h3>
                <h3>{res.courses[0].level}</h3>
              </div>
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
