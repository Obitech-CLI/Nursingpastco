import { Suspense } from "react";
import Instituitions from "./Instituitions";
import NursingInstituitions from "@/public/NursingInstituitions.png";
import styles from "./instituitions.module.css";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

export default function Page() {
  return (
    <main className={styles.Nursing_Instituitions}>
      <h1>Nursing Instituitions</h1>
      <Image src={NursingInstituitions} alt="" />
      <h2>
        here are the list of available instituitions with materials on our
        website
      </h2>
      <Suspense
        fallback={
          <div className="loading">
            <p>loading instituitions...</p>
            <ClipLoader size={50} color="var(--bg-txt)" />
          </div>
        }
      >
        <Instituitions />
      </Suspense>
    </main>
  );
}
