"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PastQuestionType } from "../../types/types";
import styles from "./pastQuestions.module.css";
import { ClipLoader } from "react-spinners";
import PdfViewerWrapper from "../../components/PdfViewerWrapper";

type Props = {
  pastQuestions: PastQuestionType[];
  course?: string;
};

export function PastQuestion({ pastQuestions, course }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showPdf, setShowPdf] = useState(0);

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
    <div className="pdf-overlay">
      {pastQuestions.length > 0 && (
        <>
          {!showPdf && (
            <button type="button" onClick={handleExit} className="cancel">
              <X />
            </button>
          )}
          <ul>
            {pastQuestions.map((pastQuestion) => (
              <div
                key={pastQuestion.id}
                className={showPdf === pastQuestion.id ? "selected" : ""}
              >
                {!showPdf && (
                  <li onClick={() => setShowPdf(pastQuestion.id)}>
                    {pastQuestion.title}
                  </li>
                )}
                {showPdf === pastQuestion.id && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPdf(0);
                      }}
                      className="cancel"
                      style={{ margin: "auto" }}
                    >
                      <X />
                    </button>
                    <div className="viewer">
                      <PdfViewerWrapper url={pastQuestion.pdf} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
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
