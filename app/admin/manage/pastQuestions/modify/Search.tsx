"use client";

import { useSearch } from "@/app/contexts/searchContext";
import { getCourses } from "@/app/lib/courses";
import { getInstituitions } from "@/app/lib/instituitions";
import { CourseType, InstitutionType } from "@/app/types/types";
import { selectLevels } from "@/app/ui/Options";
import { ChevronDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export function SearchPastQuestionsAdmin() {
  const [instituitions, setInstituitions] = useState<InstitutionType[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([]);

  const [instituitionError, setInstituitionError] = useState("");
  const [courseError, setCourseError] = useState("");

  const [iLoading, setILoading] = useState(false);
  const [cLoading, setCLoading] = useState(false);

  const [showInstituitions, setShowInstituitions] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showLevels, setShowLevels] = useState(false);

  const [searchInstituition, setSearchInstituition] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchLevel, setSearchLevel] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const { setShowSearch } = useSearch();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchInstituition) {
      params.set("instituition", searchInstituition);
    }
    if (searchCourse) {
      params.set("course", searchCourse);
    }
    if (searchLevel) {
      params.set("level", searchLevel);
    }
    router.push(`/admin/manage/pastQuestions/modify?${params}`);
    setShowSearch(false);
  };

  const handleAll = () => {
    router.push(`/admin/manage/pastQuestions/modify`);
    setSearchInstituition("");
    setSearchCourse("");
    setSearchLevel("");
    setShowSearch(false);
  };

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
      const res = await getCourses(searchInstituition, searchLevel);
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
    if (!searchInstituition && !searchLevel) return;
    fetchCourses();
  }, [searchInstituition, searchLevel]);

  return (
    <fieldset>
      <h3>search pastQuestions</h3>
      <button type="button" onClick={handleAll}>
        all
      </button>
      <label>
        <button
          type="button"
          onClick={() => setShowInstituitions(!showInstituitions)}
        >
          {searchInstituition ? searchInstituition : "select instituition"}
          <ChevronDown />
        </button>
        {showInstituitions && (
          <div className="select">
            <button
              type="button"
              className="cancel"
              onClick={() => setShowInstituitions(false)}
            >
              <X />
            </button>
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
                          onClick={() => setSearchInstituition(i.name)}
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
        <button type="button" onClick={() => setShowLevels(!showLevels)}>
          {searchLevel ? searchLevel : "select level"}
          <ChevronDown />
        </button>
        {showLevels && (
          <>
            <div className="select">
              <button
                type="button"
                className="cancel"
                onClick={() => setShowLevels(false)}
              >
                <X />
              </button>
              <h2>select level</h2>
              <ul>
                {selectLevels.map((l) => (
                  <li key={l.id} onClick={() => setSearchLevel(l.level)}>
                    {l.level}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </label>
      <label>
        <button
          type="button"
          onClick={() => {
            if (searchInstituition && searchLevel) {
              setShowCourses(!showCourses);
            }
          }}
        >
          {searchCourse ? searchCourse : "select course"}
          <ChevronDown />
        </button>
        {showCourses && (
          <div className="select">
            <button
              type="button"
              className="cancel"
              onClick={() => setShowCourses(false)}
            >
              <X />
            </button>
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
                          onClick={() => setSearchCourse(c.course)}
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
      <button type="button" onClick={handleSearch}>
        search
      </button>
    </fieldset>
  );
}
