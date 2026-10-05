"use client";

import { useSearch } from "@/app/contexts/searchContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchCoursesAdmin() {
  const [searchInstituition, setSearchInstituition] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [searchLevel, setSearchLevel] = useState("");

  const { setShowSearch } = useSearch();

  const searchParams = useSearchParams();
  const router = useRouter();

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
    router.push(`/admin/manage/courses/modify?${params}`);
    setShowSearch(false);
  };

  const handleAll = () => {
    router.push(`/admin/manage/courses/modify`);
    setSearchInstituition("");
    setSearchCourse("");
    setSearchLevel("");
    setShowSearch(false);
  };

  return (
    <fieldset>
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
        search
      </button>
    </fieldset>
  );
}
