"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PastQuestionType } from "../types/types";
import styles from "./pastQuestions.module.css";
import { ClipLoader } from "react-spinners";

type Props = {
  pastQuestions: PastQuestionType[];
  course?: string;
};

export function PastQuestion({ pastQuestions, course }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showPdf, setShowPdf] = useState(0);

  const [pdfLoading, setPDFLoading] = useState(true);

  const handleExit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("course", "");
    router.replace(`/nursing-pastQuestions?${params}`);
  };

  useEffect(() => {
    document.body.style.overflow = course ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [course]);
  return (
    <>
      {pastQuestions.length > 0 && (
        <>
          <button type="button" onClick={handleExit} className="cancel">
            <X />
          </button>
          <ul>
            {pastQuestions.map((pastQuestion) => (
              <div key={pastQuestion.id}>
                <li onClick={() => setShowPdf(pastQuestion.id)}>
                  {pastQuestion.title}
                </li>
                {showPdf === pastQuestion.id && (
                  <div className={styles.pdf}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPdf(0);
                        setPDFLoading(true);
                      }}
                      className="cancel"
                    >
                      <X />
                    </button>
                    <>
                      {pdfLoading && (
                        <div className="loading">
                          <p>loading pdf...</p>{" "}
                          <ClipLoader size={50} color="var(--bg-txt)" />
                        </div>
                      )}
                      <iframe
                        src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pastQuestion.pdf)}`}
                        width="100%"
                        height="100%"
                        onLoad={() => setPDFLoading(false)}
                      />
                    </>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

{
  /*<div
      key={pastQuestion.id}
      className="select"
      style={{
        padding: "7.8rem 0 4rem",
      }}
    >
      <button
        type="button"
        onClick={handleSearch}
        style={{
          padding: "0",
          backgroundColor: "transparent",
        }}
      >
        <X />
      </button>
      <h3>{pastQuestion.title}</h3>
      {/*
    </div>
  )*/
}
