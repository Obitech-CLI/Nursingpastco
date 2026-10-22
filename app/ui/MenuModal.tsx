"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./ui.css";
import {
  BadgeCheck,
  Book,
  BookOpen,
  ClipboardList,
  Clock,
  FileText,
  Inbox,
  Notebook,
  NotebookPenIcon,
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
                    href="/nursing-nmcnpastQuestions"
                    className={
                      pathname === "/nursing-nmcnpastQuestions" ? "active" : ""
                    }
                  >
                    <span>
                      <ClipboardList size={25} />
                    </span>
                    nmcn pastQuestions
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/nursing-textbooks"
                    className={
                      pathname === "/nursing-textbooks" ? "active" : ""
                    }
                  >
                    <span>
                      <Book size={25} />
                    </span>
                    nursing textbooks
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/coming-soon"
                    className={pathname === "" ? "active" : ""}
                  >
                    <span>
                      <NotebookPenIcon size={25} />
                    </span>
                    nursing notes
                    <h6>
                      coming soon <Clock size={10} />
                    </h6>
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/coming-soon"
                    className={pathname === "" ? "active" : ""}
                  >
                    <span>
                      <FileText size={25} />
                    </span>
                    nursing contents
                    <h6>
                      coming soon <Clock size={10} />
                    </h6>
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/coming-soon"
                    className={pathname === "" ? "active" : ""}
                  >
                    <span>
                      <RefreshCw size={25} />
                    </span>
                    nursing news & updates
                    <h6>
                      coming soon <Clock size={10} />
                    </h6>
                  </Link>

                  <Link
                    onClick={ResetMenu}
                    href="/coming-soon"
                    className={pathname === "" ? "active" : ""}
                  >
                    <span>
                      <BadgeCheck size={25} />
                    </span>
                    nursing recommendations
                    <h6>
                      coming soon <Clock size={10} />
                    </h6>
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
