"use client";

import { useErrorModal, useSuccessModal } from "@/app/contexts/modalContexts";
import { getInstituitions } from "@/app/lib/instituitions";
import { getMidwiferyCourses } from "@/app/lib/midwifery";
import { InstitutionType, MidwiferyCoursesType } from "@/app/types/types";
import { ChevronDown, File, List } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { addMidwiferyPastQuestion } from "./action";

const initialState = {
  msg: "",
  err: "",
};

export default function AddForm() {
  const [state, action, pending] = useActionState(
    addMidwiferyPastQuestion,
    initialState,
  );

  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [courses, setCourses] = useState<MidwiferyCoursesType[]>([]);

  const [instituitionError, setInstituitionError] = useState("");
  const [courseError, setCourseError] = useState("");

  const [iLoading, setILoading] = useState(false);
  const [cLoading, setCLoading] = useState(false);

  const [selectedInstituition, setSelectedInstituition] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [showInstituitions, setShowInstituitions] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

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
      const res = await getMidwiferyCourses(selectedInstituition);
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
    if (!selectedInstituition) return;
    fetchCourses();
  }, [selectedInstituition]);

  useEffect(() => {
    if (state.msg) {
      setSuccessMsg(state.msg);
      setSelectedInstituition("");
      setSelectedCourse("");
    }
    if (state.err) {
      setErrorMsg(state.err);
    }
  }, [state]);
  return (
    <form className="auth" action={action}>
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
        <input type="hidden" name="course" defaultValue={selectedCourse} />
        <button type="button" onClick={() => setShowCourses(!showCourses)}>
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

      <label>
        <File />
        <input type="file" name="pdf" accept="application/pdf" />
      </label>

      <button type="submit" disabled={pending}>
        {pending ? "adding..." : "add"}
        {pending && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
