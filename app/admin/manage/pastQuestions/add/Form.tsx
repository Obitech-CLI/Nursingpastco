"use client";

import { useActionState, useEffect, useState } from "react";
import { addPastQuestion } from "./action";
import { getInstituitions } from "@/app/lib/instituitions";
import { selectLevels } from "@/app/ui/Options";
import { getCourses } from "@/app/lib/courses";
import { ChevronDown, Image, List } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { CourseType, InstitutionType } from "@/app/types/types";

const initialState = {
  msg: "",
  err: "",
};

export function AddForm() {
  const [state, action, pending] = useActionState(
    addPastQuestion,
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
      const res = await getCourses(selectedInstituition, selectedLevel);
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
    if (!selectedInstituition && !selectedLevel) return;
    fetchCourses();
  }, [selectedInstituition, selectedLevel]);

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      setSelectedInstituition("");
      setSelectedCourse("");
      setSelectedLevel("");
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);

  return (
    <form action={action}>
      <label>
        <List size={30} />
        <input
          type="hidden"
          name="instituition"
          defaultValue={selectedInstituition}
        />
        <button
          type="button"
          onClick={() => setShowInstituitions(!showInstituitions)}
        >
          {selectedInstituition ? selectedInstituition : "select instituition"}
          <ChevronDown />
        </button>
        {showInstituitions && (
          <div className="select">
            {iLoading ? (
              <div className="loading">
                <p>loading instituitions...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
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
        <List size={30} />
        <input type="hidden" name="level" defaultValue={selectedLevel} />
        <button type="button" onClick={() => setShowLevels(!showLevels)}>
          {selectedLevel ? selectedLevel : "select level"}
          <ChevronDown />
        </button>
        {showLevels && (
          <>
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
          </>
        )}
      </label>
      <label>
        <List size={30} />
        <input type="hidden" name="course" defaultValue={selectedCourse} />
        <button
          type="button"
          onClick={() => {
            if (selectedInstituition && selectedLevel) {
              setShowCourses(!showCourses);
            }
          }}
        >
          {selectedCourse ? selectedCourse : "select course"}
          <ChevronDown />
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
                    <h2>select course</h2>
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
      <label>
        <Image size={30} />
        <input type="file" name="pdf" accept="application/pdf" />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
      </button>
    </form>
  );
}
