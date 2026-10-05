"use client";

import { childrenNode } from "@/app/types/types";
import { createContext, SetStateAction, useContext, useState } from "react";

type ContextProps = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<SetStateAction<boolean>>;
};

const SearchContext = createContext<ContextProps | null>(null);

function SearchProvider({ children }: childrenNode) {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchProvider };

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("no context available");
  }

  return context;
};
