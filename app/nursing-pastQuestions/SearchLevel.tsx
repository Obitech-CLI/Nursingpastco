"use client";

import { useState } from "react";
import { selectLevels } from "../ui/Options";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./pastQuestions.module.css";

export function SearchLevel({ level }: { level?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (level: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("level", level);
    router.replace(`/nursing-pastQuestions?${params}`);
  };
  return (
    <div className={styles.searchLevels}>
      {selectLevels.map((l) => (
        <button
          className={level === l.level ? styles.selected : ""}
          type="button"
          key={l.id}
          onClick={() => {
            handleSearch(l.level);
          }}
        >
          {l.level}
        </button>
      ))}
    </div>
  );
}
