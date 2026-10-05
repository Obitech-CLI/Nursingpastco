"use client";

import { usePathname } from "next/navigation";
import { useSearch } from "../contexts/searchContext";
import { SearchNursingInstitutions } from "../nursing-instituitions/Search";
import { SearchNursingCourses } from "../nursing-courses/Search";
import "./ui.css";
import { SearchCoursesAdmin } from "../admin/manage/courses/modify/Search";
import { SearchPastQuestionsAdmin } from "../admin/manage/pastQuestions/modify/Search";
import { SearchSubscribersAdmin } from "../admin/manage/subscribers/Search";

export function SearchModal() {
  const { showSearch } = useSearch();

  const pathname = usePathname();

  return (
    <>
      {showSearch && (
        <div className="search-modal">
          {pathname === "/nursing-instituitions" && (
            <SearchNursingInstitutions />
          )}
          {pathname === "/nursing-courses" && <SearchNursingCourses />}
          {pathname === "/admin/manage/courses/modify" && (
            <SearchCoursesAdmin />
          )}
          {pathname === "/admin/manage/pastQuestions/modify" && (
            <SearchPastQuestionsAdmin />
          )}
          {pathname === "/admin/manage/subscribers" && (
            <SearchSubscribersAdmin />
          )}
        </div>
      )}
    </>
  );
}
