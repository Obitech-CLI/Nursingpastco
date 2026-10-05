"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSearch } from "../contexts/searchContext";

export function SearchNursingCourses() {
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
    router.replace(`/nursing-courses?${params}`);
    setShowSearch(false);
  };

  const handleAll = () => {
    router.push(`/nursing-courses`);
    setSearchInstituition("");
    setSearchCourse("");
    setSearchLevel("");
    setShowSearch(false);
  };

  return (
    <fieldset>
      <h3>search courses</h3>
      <button type="button" onClick={handleAll}>
        all
      </button>
      <input
        type="search"
        value={searchInstituition}
        placeholder="enter instituition"
        onChange={(e) => setSearchInstituition(e.target.value)}
      />
      <input
        type="search"
        value={searchCourse}
        placeholder="enter course"
        onChange={(e) => setSearchCourse(e.target.value)}
      />
      <input
        type="search"
        value={searchLevel}
        placeholder="enter level"
        onChange={(e) => setSearchLevel(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        search <Search />
      </button>
    </fieldset>
  );
}
