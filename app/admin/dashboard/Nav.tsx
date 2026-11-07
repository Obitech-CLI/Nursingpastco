import Link from "next/link";
import "./dashboard.css";
import { Settings, Settings2 } from "lucide-react";

export function Nav() {
  return (
    <nav className="admin">
      <Link href="/admin/manage/instituitions">
        <Settings2 size={60} />
        manage instituitions
      </Link>
      <Link href="/admin/manage/courses">
        <Settings2 size={60} />
        manage courses
      </Link>
      <Link href="/admin/manage/pastQuestions">
        <Settings2 size={60} />
        manage pastQuestions
      </Link>
      <Link href="/admin/manage/textbooks">
        <Settings2 size={60} />
        manage textbooks
      </Link>
      <Link href="/admin/manage/notes">
        <Settings2 size={60} />
        manage notes
      </Link>
      <Link href="/admin/manage/nmc">
        <Settings2 size={60} />
        manage NMC
      </Link>
      <Link href="/admin/manage/contents">
        <Settings2 size={60} />
        manage contents
      </Link>
      <Link href="/admin/manage/news&updates">
        <Settings2 size={60} />
        manage news&updates
      </Link>
      <Link href="/admin/manage/recommendations">
        <Settings2 size={60} />
        manage recommendations
      </Link>
    </nav>
  );
}
