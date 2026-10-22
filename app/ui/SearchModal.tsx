"use client";

import { usePathname } from "next/navigation";
import { useSearch } from "../contexts/searchContext";
import { SearchNursingCourses } from "../(ads)/nursing-courses/Search";
import "./ui.css";
import { SearchPastQuestionsAdmin } from "../admin/manage/pastQuestions/modify/Search";
import { SearchSubscribersAdmin } from "../admin/manage/subscribers/Search";
import { SearchAdminCourses } from "../admin/manage/courses/modify/Search";
import { SearchContentTitles } from "../nursing-contents/Search";
import { SearchNewsTitles } from "../nursing-news&updates/Search";
import { SearchAdminContentTitles } from "../admin/manage/contents/modify/Search";
import { SearchAdminNewsTitles } from "../admin/manage/news&updates/modify/Search";
import { SearchAdminRecommendaionsTitles } from "../admin/manage/recommendations/modify/Search";
import { SearchRecommendationsTitles } from "../nursing-recommendations/Search";

export function SearchModal() {
  const { showSearch } = useSearch();

  const pathname = usePathname();

  return (
    <>
      {showSearch && (
        <div className="search-modal">
          {pathname === "/nursing-courses" && <SearchNursingCourses />}
          {pathname === "/nursing-contents" && <SearchContentTitles />}
          {pathname === "/nursing-news&updates" && <SearchNewsTitles />}
          {pathname === "/nursing-recommendations" && (
            <SearchRecommendationsTitles />
          )}
          {pathname === "/admin/manage/courses/modify" && (
            <SearchAdminCourses />
          )}
          {pathname === "/admin/manage/contents/modify" && (
            <SearchAdminContentTitles />
          )}
          {pathname === "/admin/manage/news&updates/modify" && (
            <SearchAdminNewsTitles />
          )}
          {pathname === "/admin/manage/recommendations/modify" && (
            <SearchAdminRecommendaionsTitles />
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
