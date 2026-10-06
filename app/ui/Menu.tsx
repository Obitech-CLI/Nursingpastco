"use client";

import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import { useMenu } from "../contexts/menuContext";
import { useSearch } from "../contexts/searchContext";

function MenuButton() {
  const { showMenu, setShowMenu } = useMenu();
  const { showSearch, setShowSearch } = useSearch();

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <button
      type="button"
      onClick={() => {
        if (showSearch) {
          setShowSearch(false);
        }
        setShowMenu(!showMenu);
      }}
    >
      {!showMenu ? <Menu size={25} /> : <X />}
    </button>
  );
}

export { MenuButton };
