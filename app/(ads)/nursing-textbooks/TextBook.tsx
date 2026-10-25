"use client";

import Image from "next/image";
import { TextbookType } from "../../types/types";
import { BookOpen, X } from "lucide-react";
import { useEffect, useState } from "react";
import PdfViewerWrapper from "../../components/PdfViewerWrapper";
import { useRouter } from "next/navigation";

type Prop = {
  textbook: TextbookType;
};

export function TextBook({ textbook }: Prop) {
  const [showPdf, setShowPdf] = useState(0);
  useEffect(() => {
    document.body.style.overflow = showPdf ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPdf]);

  const router = useRouter();

  const handleView = (title: string, url: string) => {
    router.push(`/read-pdf?title=${title}&url=${encodeURIComponent(url)}`);
  };
  return (
    <div>
      <Image src={textbook.cover} alt="" width={200} height={270} />
      <div className="book">
        <h4>{textbook.title}</h4>
        <button
          type="button"
          onClick={() => handleView(textbook.title, textbook.pdf)}
        >
          read <BookOpen />
        </button>
      </div>
    </div>
  );
}
