"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./ui.css";
import {
  BadgeCheck,
  BookOpen,
  ClipboardList,
  FileText,
  Inbox,
  RefreshCw,
  School,
  User2,
  UserCheck2,
} from "lucide-react";
import { useMenu } from "../contexts/menuContext";

function MenuModal() {
  const { showMenu, setShowMenu } = useMenu();

  const pathname = usePathname();

  const ResetMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      {showMenu && (
        <div className="menu-modal">
          <nav>
            <>
              {!pathname.startsWith("/admin") && (
                <>
                  <Link
                    onClick={ResetMenu}
                    href="/nursing-instituitions"
                    className={
                      pathname === "/nursing-instituitions" ? "active" : ""
                    }
                  >
                    <span>
                      <School size={25} />
                    </span>
                    nursing instituitions
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/nursing-courses"
                    className={pathname === "/nursing-courses" ? "active" : ""}
                  >
                    <span>
                      <BookOpen size={25} />
                    </span>
                    nursing courses
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/nursing-pastQuestions"
                    className={
                      pathname === "/nursing-pastQuestions" ? "active" : ""
                    }
                  >
                    <span>
                      <ClipboardList size={25} />
                    </span>
                    nursing pastQuestions
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/nursing-contents"
                    className={pathname === "/nursing-contents" ? "active" : ""}
                  >
                    <span>
                      <FileText size={25} />
                    </span>
                    nursing contents
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/nursing-news&updates"
                    className={
                      pathname === "/nursing-news&updates" ? "active" : ""
                    }
                  >
                    <span>
                      <RefreshCw size={25} />
                    </span>
                    nursing news & updates
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/nursing-recommendations"
                    className={
                      pathname === "/nursing-recommendations" ? "active" : ""
                    }
                  >
                    <span>
                      <BadgeCheck size={25} />
                    </span>
                    nursing recommendations
                  </Link>
                </>
              )}

              {pathname.startsWith("/admin") && (
                <>
                  <Link
                    onClick={ResetMenu}
                    href="/admin/profile"
                    className={pathname === "/admin/profile" ? "active" : ""}
                  >
                    <span>
                      <User2 size={25} />
                    </span>
                    my profile
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/admin/manage/subscribers"
                    className={
                      pathname === "/admin/manage/subscribers" ? "active" : ""
                    }
                  >
                    <span>
                      <UserCheck2 size={25} />
                    </span>
                    subscribers
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/admin/manage/messages"
                    className={
                      pathname === "/admin/manage/messages" ? "active" : ""
                    }
                  >
                    <span>
                      <Inbox size={25} />
                    </span>
                    messages
                  </Link>
                </>
              )}
            </>
          </nav>
        </div>
      )}
    </>
  );
}

export { MenuModal };
