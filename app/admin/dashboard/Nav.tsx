import Link from "next/link";
import "./dashboard.css";
import { Settings, Settings2 } from "lucide-react";

export function Nav() {
  return (
    <nav className="admin">
      <Link href="/admin/manage/instituitions">
        <Settings2 size={40} />
        manage instituitions
      </Link>
      <Link href="/admin/manage/courses">
        <Settings2 size={40} />
        manage courses
      </Link>
      <Link href="/admin/manage/pastQuestions">
        <Settings2 size={40} />
        manage pastQuestions
      </Link>
      <Link href="/admin/manage/midwifery">
        <Settings2 size={40} />
        manage midwifery pastQuestions
      </Link>
      <Link href="/admin/manage/textbooks">
        <Settings2 size={40} />
        manage textbooks
      </Link>
      <Link href="/admin/manage/notes">
        <Settings2 size={40} />
        manage notes
      </Link>
      <Link href="/admin/manage/nmc">
        <Settings2 size={40} />
        manage NMC
      </Link>
      <Link href="/admin/manage/contents">
        <Settings2 size={40} />
        manage contents
      </Link>
      <Link href="/admin/manage/news&updates">
        <Settings2 size={40} />
        manage news&updates
      </Link>
      <Link href="/admin/manage/recommendations">
        <Settings2 size={40} />
        manage recommendations
      </Link>
    </nav>
  );
}
