"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryType, NMCNType } from "../../types/types";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import PdfViewerWrapper from "../../components/PdfViewerWrapper";

type Prop = {
  nmcn: NMCNType[];
  category?: string;
};

export function NMCN({ nmcn, category }: Prop) {
  const router = useRouter();

  const [showPdf, setShowPdf] = useState(0);

  const handleAll = () => {
    router.replace(`/nursing-nmcnpastQuestions`);
  };

  useEffect(() => {
    document.body.style.overflow = category ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [category]);

  const handleView = (title: string, url: string) => {
    router.push(`/read-pdf?title=${title}&url=${encodeURIComponent(url)}`);
  };
  return (
    <div className="select nmc">
      {!showPdf && (
        <button type="button" className="cancel" onClick={handleAll}>
          <X />
        </button>
      )}
      {showPdf > 0 && (
        <button
          type="button"
          onClick={() => {
            setShowPdf(0);
          }}
          className="cancel"
        >
          <X />
        </button>
      )}
      {nmcn.length && (
        <ul>
          {nmcn.map((nmc) => (
            <div key={nmc.id}>
              <li onClick={() => handleView(nmc.title, nmc.pdf)}>
                {nmc.title}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
