"use client";

import Image from "next/image";
import { TextbookType } from "../types/types";
import { BookOpen, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

type Prop = {
  textbook: TextbookType;
};

export function TextBook({ textbook }: Prop) {
  const [showPdf, setShowPdf] = useState(0);
  const [pdfLoading, setPDFLoading] = useState(true);
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
              setPDFLoading(true);
            }}
            className="cancel"
          >
            <X />
          </button>
          <>
            {pdfLoading && (
              <div className="loading">
                <p>loading pdf...</p>{" "}
                <ClipLoader size={50} color="var(--bg-txt)" />
              </div>
            )}
            <iframe
              src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(textbook.pdf)}`}
              width="100%"
              height="100%"
              onLoad={() => setPDFLoading(false)}
            />
          </>
        </div>
      )}
    </div>
  );
}
