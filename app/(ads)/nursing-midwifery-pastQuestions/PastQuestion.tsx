"use client";

import { useEffect, useState } from "react";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MidwiferyCoursesType,
  MidwiferyPastQuestionType,
} from "../../types/types";
import { getMidwiferyPastQuestions } from "../../lib/midwifery";
import { ClipLoader } from "react-spinners";

type Props = {
  course: MidwiferyCoursesType;
};

export function PastQuestion({ course }: Props) {
  const [pastQuestions, setPastQuestions] = useState<
    MidwiferyPastQuestionType[]
  >([]);
  const [showPdf, setShowPdf] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [error, setError] = useState("");

  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const res = await getMidwiferyPastQuestions(
        course.instituition,
        course.course,
      );
      if (!res) return;
      if (res.pastQuestions?.length) {
        setPastQuestions(res.pastQuestions);
        setError("");
      }
      if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      console.error(err);
      setError("something went wrong. try again");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (title: string, url: string) => {
    router.push(
      `/read-pdf?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    );
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          fetchPdfs();
          setShowPdf(true);
        }}
      >
        {course.course}
        <ChevronDown />
      </button>
      {showPdf && (
        <div className="select">
          <button
            type="button"
            className="cancel"
            onClick={() => {
              setShowPdf(false);
            }}
          >
            <X />
          </button>
          {!loading && pastQuestions.length > 0 ? (
            <>
              <h2>select midwifery pastQuestions</h2>
              <h3>{course.course}</h3>
              <ul>
                {pastQuestions.map((p) => (
                  <li key={p.id} onClick={() => handleView(p.title, p.pdf)}>
                    {p.title}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {error && pastQuestions.length === 0 ? (
            <div className="retry">
              <p>{error}</p>
              <button type="button" onClick={fetchPdfs}>
                retry
                <RotateCcw />
              </button>
            </div>
          ) : null}

          {loading && (
            <div className="loading">
              <p>loading pastQuestions...</p>
              <ClipLoader size={50} color="var(--bg-txt)" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
