"use client";

import { usePathname } from "next/navigation";
import { useSearch } from "../contexts/searchContext";
import { SearchNursingCourses } from "../nursing-courses/Search";
import "./ui.css";
import { SearchPastQuestionsAdmin } from "../admin/manage/pastQuestions/modify/Search";
import { SearchSubscribersAdmin } from "../admin/manage/subscribers/Search";
import { SearchAdminCourses } from "../admin/manage/courses/modify/Search";

export function SearchModal() {
  const { showSearch } = useSearch();

  const pathname = usePathname();

  return (
    <>
      {showSearch && (
        <div className="search-modal">
          {pathname === "/nursing-courses" && <SearchNursingCourses />}
          {pathname === "/admin/manage/courses/modify" && (
            <SearchAdminCourses />
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
