import { getNMCCourses } from "@/app/lib/nmc";
import { NMCCourseType } from "@/app/types/types";
import { RetryButton } from "@/app/ui/Retry";
import PastQuestion from "./PastQuestion";

type Type = {
  error?: string;
  courses?: NMCCourseType[];
};

export default async function PastQuestions({
  searchParams,
}: {
  searchParams: Promise<{
    country?: string;
  }>;
}) {
  const { country } = await searchParams;
  const res: Type = await getNMCCourses(country);
  return (
    <div className="pastQuestions">
      {res.error && (
        <div className="retry">
          <p>{res.error}</p>
          <RetryButton />
        </div>
      )}
      {res.courses?.length && (
        <div className="pastQuestion">
          <h3 style={{ textTransform: "uppercase" }}>
            nmc{country?.at(0)}{" "}
            <span style={{ textTransform: "lowercase" }}>courses</span>
          </h3>
          <p>choose a course to see past questions</p>
          {res.courses.map((course) => (
            <PastQuestion key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
