"use client";

import { getNMCCountries } from "@/app/lib/categories";
import { getNMCCourses } from "@/app/lib/nmc";
import { NMCCountryType, NMCCourseType } from "@/app/types/types";
import { ChevronDown, RotateCcw, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export function SelectNMCPastQuestions() {
  const [countries, setCountries] = useState<NMCCountryType[]>([]);
  const [courses, setCourses] = useState<NMCCourseType[]>([]);
  const [showCountries, setShowCountries] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [cloading, setCLoading] = useState(false);
  const [error, setError] = useState("");
  const [cerror, setCError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await getNMCCountries();
      if (res.countries) {
        setCountries(res.countries);
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      setCLoading(true);
      const res = await getNMCCourses(selectedCountry);
      if (res.courses) {
        setCourses(res.courses);
      } else if (res.error) {
        setCError(res.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [selectedCountry]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCountry || selectedCourse) {
      params.set("country", selectedCountry);
      params.set("course", selectedCourse);
    }
    router.replace(`/admin/manage/nmc/modify?${params}`);
  };
  return (
    <fieldset>
      <h4>search nmc past questions</h4>
      <label>
        <input type="hidden" name="country" defaultValue={selectedCountry} />
        <button type="button" onClick={() => setShowCountries(!showCountries)}>
          {selectedCountry ? selectedCountry : "select a country"}
          <ChevronDown />
        </button>
        {showCountries && (
          <div className="select">
            <h2>choose nmc country</h2>
            {!loading ? (
              <>
                {countries.length > 0 ? (
                  <ul>
                    {countries.map((country) => (
                      <li
                        key={country.id}
                        onClick={() => setSelectedCountry(country.country)}
                      >
                        {country.country}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {error && (
                      <div className="retry">
                        <p>{error}</p>
                        <button type="button" onClick={fetchCountries}>
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
                <p>loading countries...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            )}
          </div>
        )}
      </label>
      <label>
        <input type="hidden" name="course" defaultValue={selectedCourse} />
        <button type="button" onClick={() => setShowCourses(!showCourses)}>
          {selectedCourse ? selectedCourse : "select a course"}
          <ChevronDown />
        </button>
        {showCourses && (
          <div className="select">
            <h2>select courses</h2>
            {!cloading ? (
              <>
                {courses.length > 0 ? (
                  <ul>
                    {courses.map((course) => (
                      <li
                        key={course.id}
                        onClick={() => setSelectedCourse(course.course)}
                      >
                        {course.course}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    {cerror && (
                      <div className="retry">
                        <p>{cerror}</p>
                        <button type="button" onClick={fetchCourses}>
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
                <p>loading courses...</p>
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            )}
          </div>
        )}
      </label>
      <button type="button" onClick={handleSearch}>
        search <Search />
      </button>
    </fieldset>
  );
}
