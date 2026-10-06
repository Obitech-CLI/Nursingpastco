"use client";

import { useActionState, useEffect, useState } from "react";
import { DeleteForm } from "./Delete";
import { getInstituitions } from "@/app/lib/instituitions";
import { selectLevels } from "@/app/ui/Options";
import { PastQuestionType } from "./PastQuestions";
import { updatePastQuestion } from "./action";
import { getCourses } from "@/app/lib/courses";
import { ChevronDown, Delete, PenBox } from "lucide-react";
import { RetryButton } from "@/app/ui/Retry";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { useRouter } from "next/navigation";
import { CourseType, InstitutionType } from "@/app/types/types";

type Props = {
  pastQuestion: PastQuestionType;
};

const initialState = {
  msg: "",
  err: "",
};

export function ModifyPastQuestion({ pastQuestion }: Props) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [state, action, pending] = useActionState(
    updatePastQuestion,
    initialState,
  );

  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);

  const [instituitionError, setInstituitionError] = useState("");
  const [courseError, setCourseError] = useState("");

  const [iLoading, setILoading] = useState(false);
  const [cLoading, setCLoading] = useState(false);

  const [selectedInstituition, setSelectedInstituition] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const [showInstituitions, setShowInstituitions] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showLevels, setShowLevels] = useState(false);

  const { setSuccessMsg } = useSuccessModal();
  const { setErrorMsg } = useErrorModal();

  const router = useRouter();

  const fetchInstituitions = async () => {
    try {
      setILoading(true);
      const res = await getInstituitions();
      if (res.instituitions) {
        setInstituitions(res.instituitions);
        return;
      }
      if (res.error) {
        setInstituitionError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setILoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setCLoading(true);
      const res = await getCourses(
        pastQuestion.instituition,
        pastQuestion.level,
      );
      if (res.courses) {
        setCourseError("");
        setCourses(res.courses);
        return;
      }
      if (res.error) {
        setCourses([]);
        setCourseError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCLoading(false);
    }
  };

  useEffect(() => {
    fetchInstituitions();
  }, []);

  useEffect(() => {
    if (!pastQuestion.instituition && !pastQuestion.level) return;
    fetchCourses();
  }, [editing]);

  useEffect(() => {
    if (state.msg) {
      setSelectedInstituition("");
      setSelectedCourse("");
      setSelectedLevel("");
      setEditing(false);
      setSuccessMsg(state.msg);
      router.refresh();
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  return (
    <>
      <form
        key={pastQuestion.id}
        action={action}
        className={editing ? "editing" : ""}
      >
        <h3>{pastQuestion.title}</h3>
        {editing && (
          <div className="det">
            <input
              type="hidden"
              name="pastQuestion-id"
              value={editing ? Number(pastQuestion.id) : ""}
            />
            <label>
              <input
                type="hidden"
                name="instituition"
                defaultValue={selectedInstituition || pastQuestion.instituition}
              />
              <button
                type="button"
                onClick={() => {
                  if (editing) {
                    setShowInstituitions(!showInstituitions);
                  }
                }}
              >
                {selectedInstituition
                  ? selectedInstituition
                  : pastQuestion.instituition}
                {editing && <ChevronDown />}
              </button>
              {showInstituitions && (
                <div className="select">
                  {iLoading ? (
                    <div className="loading">
                      <p>loading instituitions...</p>
                      <RetryButton />
                    </div>
                  ) : (
                    <>
                      {instituitions.length > 0 && (
                        <>
                          <h2>select instituition</h2>
                          <ul>
                            {instituitions.map((i) => (
                              <li
                                key={i.id}
                                onClick={() => setSelectedInstituition(i.name)}
                              >
                                {i.name}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {instituitionError && (
                        <div className="retry">
                          <p>{instituitionError}</p>
                          <button type="button" onClick={fetchInstituitions}>
                            retry
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </label>
            <label>
              <input
                type="hidden"
                name="level"
                defaultValue={selectedLevel || pastQuestion.level}
              />
              <button
                type="button"
                onClick={() => {
                  if (editing) {
                    setShowLevels(!showLevels);
                  }
                }}
              >
                {selectedLevel ? selectedLevel : pastQuestion.level}
                {editing && <ChevronDown />}
              </button>
              {showLevels && (
                <div className="select">
                  <h2>select level</h2>
                  <ul>
                    {selectLevels.map((l) => (
                      <li key={l.id} onClick={() => setSelectedLevel(l.level)}>
                        {l.level}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </label>
            <label>
              <input
                type="hidden"
                name="course"
                defaultValue={selectedCourse || pastQuestion.course}
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    selectedInstituition ||
                    (pastQuestion.instituition && selectLevels) ||
                    pastQuestion.level
                  ) {
                    if (!editing) return;
                    setShowCourses(!showCourses);
                  }
                }}
              >
                {selectedCourse ? selectedCourse : pastQuestion.course}
                {editing && <ChevronDown />}
              </button>
              {showCourses && (
                <div className="select">
                  {cLoading ? (
                    <div className="loading">
                      <p>loading courses...</p>
                      <ClipLoader size={50} color="var(--bg-txt)" />
                    </div>
                  ) : (
                    <>
                      {courses.length > 0 && (
                        <>
                          <h2>select courses</h2>
                          <ul>
                            {courses.map((c) => (
                              <li
                                key={c.id}
                                onClick={() => setSelectedCourse(c.course)}
                              >
                                {c.course}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {courseError && (
                        <div className="retry">
                          <p>{courseError}</p>
                          <button type="button" onClick={fetchCourses}>
                            retry
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </label>
            {editing && (
              <input type="file" name="pdf" accept="application/pdf" />
            )}
          </div>
        )}
        <div className="btns">
          <button
            type="button"
            onClick={() => setDeleting(true)}
            disabled={editing}
          >
            <Delete color="red" size={25} />
            delete
          </button>
          <button onClick={() => setEditing(!editing)} type="button">
            <PenBox color="blue" size={25} />
            {editing ? "cancel" : "edit"}
          </button>
        </div>

        {editing && (
          <button type="submit" disabled={pending}>
            {pending ? "updating..." : "update"}
            {pending && <ClipLoader size={25} />}
          </button>
        )}
      </form>
      {deleting && (
        <DeleteForm
          id={pastQuestion.id}
          editing={editing}
          deleting={deleting}
          setDeleting={setDeleting}
        />
      )}
    </>
  );
}
