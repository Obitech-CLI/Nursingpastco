"use client";

import { useState } from "react";
import { CourseType } from "./Courses";
import styles from "./courses.module.css";
import { ChevronDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  course: CourseType;
};

export function Course({ course }: Props) {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("instituition", course.instituition);
    params.set("level", course.level);
    params.set("course", course.course);
    router.push(`/nursing-pastQuestions?${params}`);
  };
  return (
    <div key={course.id} className={styles.course}>
      <h3 onClick={() => setShow(!show)}>
        {course.course}
        <ChevronDown />
      </h3>
      {show && (
        <div className="select">
          <button
            type="button"
            onClick={() => setShow(false)}
            style={{
              padding: "0",
              backgroundColor: "transparent",
            }}
          >
            <X />
          </button>
          <h4>{course.instituition}</h4>
          <h4>{course.level}</h4>
          <button type="button" onClick={handleSearch}>
            past questions
          </button>
        </div>
      )}
    </div>
  );
}
