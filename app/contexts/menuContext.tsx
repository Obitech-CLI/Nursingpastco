"use client";

import { childrenNode } from "@/app/types/types";
import { createContext, SetStateAction, useContext, useState } from "react";

type ContextProps = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
};

const MenuContext = createContext<ContextProps | null>(null);

function MenuProvider({ children }: childrenNode) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <MenuContext.Provider
      value={{
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export { MenuProvider };

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("no context available");
  }

  return context;
};
