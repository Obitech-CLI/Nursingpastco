import Link from "next/link";
import "./dashboard.css";
import { Settings2 } from "lucide-react";

export function Nav() {
  return (
    <nav>
      <Link href="/admin/manage/instituitions">
        <Settings2 size={30} />
        manage instituitions
      </Link>
      <Link href="/admin/manage/courses">
        <Settings2 size={30} />
        manage courses
      </Link>
      <Link href="/admin/manage/pastQuestions">
        <Settings2 size={30} />
        manage pastQuestions
      </Link>
      <Link href="/admin/manage/contents">
        <Settings2 size={30} />
        manage contents
      </Link>
      <Link href="/admin/manage/news&updates">
        <Settings2 size={30} />
        manage news&updates
      </Link>
      <Link href="/admin/manage/recommendations">
        <Settings2 size={30} />
        manage recommendations
      </Link>
    </nav>
  );
}
