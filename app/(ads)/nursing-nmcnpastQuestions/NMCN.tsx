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
  return (
    <div className="pdf-overlay nmc">
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
            <div key={nmc.id} className={showPdf === nmc.id ? "selected" : ""}>
              {!showPdf && (
                <li onClick={() => setShowPdf(nmc.id)}>{nmc.title}</li>
              )}
              {showPdf === nmc.id && (
                <div className="viewer">
                  <PdfViewerWrapper url={nmc.pdf} />
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
