"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSearch } from "../contexts/searchContext";

export function SearchNursingInstitutions() {
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const { setShowSearch } = useSearch();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", search);
    router.push(`/nursing-instituitions?${params}`);
    setShowSearch(false);
  };

  const handleAll = () => {
    router.replace(`/nursing-instituitions`);
    setSearch("");
    setShowSearch(false);
  };

  return (
    <fieldset>
      <h3>search instituitions</h3>
      <button type="button" onClick={handleAll}>
        all
      </button>
      <input
        type="search"
        value={search}
        placeholder="enter instituition"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        search <Search />
      </button>
    </fieldset>
  );
}
