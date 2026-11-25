import { Suspense } from "react";
import Countries from "./Countries";
import "./style.css";
import Image from "next/image";
import banner from "@/public/nmc-banner.png";
import { CountriesSkeleton } from "../nursing-council-pastQuestions/Skeleton";

export default function Page() {
  return (
    <main className="nmc-countries">
      <h2>Nursing and Midwifery Council (NMC) Past Questions</h2>
      <Image alt="" src={banner} width={500} height={200} />
      <h3>
        Prepare for your nursing and midwifery examinations with past questions
        and study materials from different countries. Nursing PastCO helps
        nursing students find available examination resources to support their
        studies, strengthen their knowledge, and prepare for upcoming exams.
      </h3>
      <Suspense fallback={<CountriesSkeleton />}>
        <Countries />
      </Suspense>
      <section>
        <h3>Your Nursing Success Starts Here</h3>
        <h4>
          Preparing for nursing examinations takes dedication, practice, and a
          good understanding of your course materials. Nursing PastCO brings
          available study resources together to make your exam preparation more
          convenient. Explore past questions, practise consistently, and take
          confident steps towards your nursing and midwifery career.
        </h4>

        <h2>
          Study Smarter
          <br />
          Practise More
          <br />
          Prepare for Success
        </h2>
      </section>
    </main>
  );
}
