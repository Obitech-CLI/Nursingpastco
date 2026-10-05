"use client";

import { ArrowLeft, ChevronDown, ChevronUp, HomeIcon } from "lucide-react";
import { MenuButton } from "../ui/Menu";
import { SearchButton } from "../ui/Search";
import { AppTheme } from "../ui/Theme";
import "./components.css";
import { usePathname, useRouter } from "next/navigation";
import { LogoWithName } from "../ui/Logo";
import { useState } from "react";

export function Header() {
  const [nav, openNav] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const goBack = () => {
    router.back();
  };
  const GoHome = () => {
    if (pathname === "/admin/login") {
      router.replace("/");
    } else if (pathname.startsWith("/admin")) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/");
    }
  };
  return (
    <header>
      <div className="logo">
        <LogoWithName />
      </div>
      <button type="button" onClick={() => openNav(!nav)}>
        {nav ? <ChevronDown /> : <ChevronUp />}
      </button>
      {nav && (
        <div className="icon">
          <button type="button" onClick={GoHome}>
            <HomeIcon />
          </button>
          <AppTheme />
          {pathname !== "/admin/login" && (
            <>
              {pathname !== "/admin/create" && (
                <>
                  <MenuButton />
                  <button type="button" onClick={goBack}>
                    <ArrowLeft />
                  </button>
                  {pathname === "/nursing-instituitions" && <SearchButton />}
                  {pathname === "/nursing-courses" && <SearchButton />}
                  {pathname === "/admin/manage/courses/modify" && (
                    <SearchButton />
                  )}
                  {pathname === "/admin/manage/pastQuestions/modify" && (
                    <SearchButton />
                  )}
                  {pathname === "/admin/manage/subscribers" && <SearchButton />}
                </>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}
