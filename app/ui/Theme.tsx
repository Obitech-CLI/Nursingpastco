"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function AppTheme() {
  const { theme, setTheme } = useTheme();

  const [showTheme, setShowTheme] = useState(false);

  return (
    <>
      <button onClick={() => setShowTheme(!showTheme)}>
        {theme === "dark" ? <Moon /> : <Sun />}
      </button>
      {showTheme && (
        <div className="app-theme">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setShowTheme(!showTheme);
            }}
            style={{
              backgroundColor: theme === "dark" ? "#c0ebff" : "",
              color: theme === "light" ? "" : "black",
            }}
          >
            <Sun size={20} color="black" />
            light
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setShowTheme(!showTheme);
            }}
            style={{
              backgroundColor: theme === "dark" ? "" : "#c0ebff",
              color: theme === "dark" ? "" : "black",
            }}
          >
            <Moon size={20} color="black" />
            dark
          </button>
        </div>
      )}
    </>
  );
}

export { AppTheme };
