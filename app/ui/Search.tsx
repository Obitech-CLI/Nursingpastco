"use client";

import { Search, X } from "lucide-react";
import { useSearch } from "../contexts/searchContext";
import { useMenu } from "../contexts/menuContext";

function SearchButton() {
  const { showSearch, setShowSearch } = useSearch();
  const { showMenu, setShowMenu } = useMenu();

  return (
    <button
      type="button"
      onClick={() => {
        if (showMenu) {
          setShowMenu(false);
        }
        setShowSearch(!showSearch);
      }}
    >
      {!showSearch ? <Search size={25} /> : <X />}
    </button>
  );
}

export { SearchButton };
