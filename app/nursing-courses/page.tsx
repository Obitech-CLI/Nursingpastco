import { Suspense } from "react";
import Courses from "./Courses";
import Image from "next/image";
import NursingCourses from "@/public/NursingCourses.png";
import styles from "./courses.module.css";
import { ClipLoader } from "react-spinners";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    course?: string;
    level?: string;
  }>;
}) {
  return (
    <main className={styles.Nursing_Courses}>
      <h2>Nursing Courses</h2>
      <Image src={NursingCourses} alt="" />
      <h3>
        here are the list of all available courses with materials on our website
      </h3>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading courses...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Courses searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
