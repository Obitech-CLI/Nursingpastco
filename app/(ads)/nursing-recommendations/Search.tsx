"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSearch } from "../../contexts/searchContext";

export function SearchRecommendationsTitles() {
  const [search, setSearch] = useState("");
  const { setShowSearch } = useSearch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
      params.set("page", "1");
    }
    router.replace(`/nursing-recommendations?${params}`);
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
