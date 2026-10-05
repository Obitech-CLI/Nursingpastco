"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export { AppThemeProvider };
