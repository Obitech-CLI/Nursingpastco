"use client";

import Image from "next/image";
import { TextbookType } from "../types/types";
import { BookOpen, X } from "lucide-react";
import { useState } from "react";
import PdfViewerWrapper from "../components/PdfViewerWrapper";

type Prop = {
  textbook: TextbookType;
};

export function TextBook({ textbook }: Prop) {
  const [showPdf, setShowPdf] = useState(0);
  return (
    <div>
      <Image src={textbook.cover} alt="" width={200} height={270} />
      <div className="book">
        <h4>{textbook.title}</h4>
        <button type="button" onClick={() => setShowPdf(textbook.id)}>
          read <BookOpen />
        </button>
      </div>
      {showPdf === textbook.id && (
        <div className="pdf">
          <button
            type="button"
            onClick={() => {
              setShowPdf(0);
            }}
            className="cancel"
          >
            <X />
          </button>
          <>
            <PdfViewerWrapper url={textbook.pdf} />
          </>
        </div>
      )}
    </div>
  );
}
