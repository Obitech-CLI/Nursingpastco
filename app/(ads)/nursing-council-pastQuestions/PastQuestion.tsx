"use client";

import { getNMCPastQuestions } from "@/app/lib/nmc";
import { NMCCourseType, NMCPastQuestionType } from "@/app/types/types";
import { ChevronDown, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function PastQuestion({ course }: { course: NMCCourseType }) {
  const [pastQuestions, setPastQuestions] = useState<NMCPastQuestionType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();

  const fetchPastQuestions = async () => {
    try {
      setLoading(true);
      const res = await getNMCPastQuestions(course.country, course.course);
      if (res.pastQuestions) {
        setPastQuestions(res.pastQuestions);
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
          setShow(true);
          fetchPastQuestions();
        }}
      >
        {course.course} <ChevronDown />
      </button>
      {show && (
        <div className="select">
          <button
            type="button"
            className="cancel"
            onClick={() => setShow(false)}
          >
            <X />
          </button>
          <h2>past questions</h2>
          {!loading ? (
            <>
              {pastQuestions.length > 0 ? (
                <ul>
                  {pastQuestions.map((question) => (
                    <li
                      key={question.id}
                      onClick={() => handleView(question.title, question.pdf)}
                    >
                      {question.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {error && (
                    <div className="retry">
                      <p>{error}</p>
                      <button type="button" onClick={fetchPastQuestions}>
                        retry
                        <RotateCcw size={25} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="loading">
              <p>loading past Questions...</p>
              <ClipLoader size={50} color="var(--bg-txt)" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
