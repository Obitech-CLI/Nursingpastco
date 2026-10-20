"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryType, NMCNType } from "../types/types";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

type Prop = {
  nmcn: NMCNType[];
  category?: string;
};

export function NMCN({ nmcn, category }: Prop) {
  const router = useRouter();

  const [showPdf, setShowPdf] = useState(0);
  const [pdfLoading, setPDFLoading] = useState(true);

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
            setPDFLoading(true);
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
              {!showPdf && (
                <li onClick={() => setShowPdf(nmc.id)}>{nmc.title}</li>
              )}
              {showPdf === nmc.id && (
                <>
                  {pdfLoading && (
                    <div className="loading">
                      <p>loading pdf...</p>
                      <ClipLoader size={50} color="var(--bg-txt)" />
                    </div>
                  )}
                  <iframe
                    src={nmc.pdf}
                    width="100%"
                    height="100%"
                    onLoad={() => setPDFLoading(false)}
                  />
                </>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
