"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CourseType } from "../nursing-courses/Courses";
import { getCourses } from "../lib/courses";
import styles from "./pastQuestions.module.css";

export function SearchCourse({
  instituition,
  level,
}: {
  instituition?: string;
  level?: string;
}) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [Loading, setLoading] = useState(false);
  const [courseError, setCourseError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await getCourses(instituition, "", level);
      if (res.courses) {
        setCourseError("");
        setCourses(res.courses);
        return;
      }
      if (res.error) {
        setCourses([]);
        setCourseError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!instituition && !level) return;
    fetchCourses();
  }, [instituition, level]);

  const handleSearch = (course: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("course", course);
    router.replace(`/nursing-pastQuestions?${params}`);
  };
  return (
    <div className={styles.searchCourses}>
      {instituition && level ? (
        <div className={styles.courses}>
          {Loading ? (
            <p>loading courses...</p>
          ) : (
            <>
              {courses.length > 0 && (
                <ul>
                  <h3>courses</h3>
                  {courses.map((c) => (
                    <li key={c.id} onClick={() => handleSearch(c.course)}>
                      {c.course} <ChevronDown />
                    </li>
                  ))}
                </ul>
              )}
              {courseError && (
                <div>
                  <p>{courseError}</p>
                  <button type="button" onClick={fetchCourses}>
                    retry
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
