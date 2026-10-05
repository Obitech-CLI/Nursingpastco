"use client";

import { Menu, Search, X } from "lucide-react";
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
      <span>{!showSearch ? <Search size={25} /> : <X />}</span>
    </button>
  );
}

export { SearchButton };
