"use client";

import { useSearch } from "@/app/contexts/searchContext";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchAdminRecommendaionsTitles() {
  const [search, setSearch] = useState("");
  const { setShowSearch } = useSearch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    }
    router.replace(`/admin/manage/recommendations/modify?${params}`);
    setShowSearch(false);
  };
  return (
    <fieldset>
      <h4>search recommendations</h4>
      <label>
        <input
          type="text"
          placeholder="enter a keyword"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSearch}>
        search <Search />
      </button>
    </fieldset>
  );
}
