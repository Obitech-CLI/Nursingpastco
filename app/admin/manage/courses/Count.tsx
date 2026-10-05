import { getInstituitions } from "@/app/lib/instituitions";
import { CourseType } from "./modify/Courses";
import { getCourses } from "@/app/lib/courses";

type Type = {
  courses?: CourseType[];
  error?: string;
};

export async function CoursesCount() {
  const res: Type = await getCourses();
  return (
    <h3
      style={{
        boxShadow: "var(--box-shadow)",
        padding: "1rem 2rem",
        borderRadius: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          backgroundColor: "var(--color-1)",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "50px",
        }}
      >
        total courses
      </span>
      {res.courses?.length || 0}
    </h3>
  );
}
