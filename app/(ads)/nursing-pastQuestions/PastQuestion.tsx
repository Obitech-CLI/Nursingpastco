"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PastQuestionType } from "../../types/types";
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

  const handleView = (title: string, url: string) => {
    router.push(`/read-pdf?title=${title}&url=${encodeURIComponent(url)}`);
  };
  return (
    <div className="select">
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
                <li
                  onClick={() =>
                    handleView(pastQuestion.title, pastQuestion.pdf)
                  }
                >
                  {pastQuestion.title}
                </li>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
