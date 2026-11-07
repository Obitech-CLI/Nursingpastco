import { getNMCCourses } from "@/app/lib/nmc";
import { NMCCourseType } from "@/app/types/types";
import { RetryButton } from "@/app/ui/Retry";
import Course from "./Course";

type Type = {
  error?: string;
  courses?: NMCCourseType[];
};

export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
  }>;
}) {
  const { country } = await searchParams;
  const res: Type = await getNMCCourses(country);
  return (
    <div>
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.courses?.length && (
        <div className="country">
          {res.courses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
