import { Suspense } from "react";
import Courses from "./Courses";
import Image from "next/image";
import NursingCourses from "@/public/NursingCourses.png";
import styles from "./courses.module.css";
import { ClipLoader } from "react-spinners";
import { SearchNursingCourses } from "./Search";
import { CoursesSkeleton } from "./Skeleton";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    instituition?: string;
    level?: string;
    page: string;
  }>;
}) {
  return (
    <main className={styles.Nursing_Courses}>
      <h2>Nursing Courses</h2>
      <Image
        src={NursingCourses}
        alt=""
        loading="eager"
        width={500}
        height={300}
      />
      <h3>
        here are the list of all available courses with materials on our website
      </h3>
      <Suspense fallback={<CoursesSkeleton />}>
        <Courses searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
