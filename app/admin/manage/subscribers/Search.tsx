"use client";

import { useSearch } from "@/app/contexts/searchContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchSubscribersAdmin() {
  const [searchEmail, setSearchEmail] = useState("");

  const { setShowSearch } = useSearch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchEmail) {
      params.set("email", searchEmail);
    }
    router.push(`/admin/manage/subscribers?${params}`);
    setShowSearch(false);
  };

  const handleAll = () => {
    router.push(`/admin/manage/subscribers`);
    setSearchEmail("");
    setShowSearch(false);
  };

  return (
    <fieldset>
      <button type="button" onClick={handleAll}>
        all
      </button>
      <input
        type="search"
        value={searchEmail}
        placeholder="enter email"
        onChange={(e) => setSearchEmail(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        search
      </button>
    </fieldset>
  );
}
