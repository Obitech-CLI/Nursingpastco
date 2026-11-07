"use client";

import { useRouter } from "next/navigation";
import PdfViewerWrapper from "../components/PdfViewerWrapper";
import { useEffect } from "react";

type Props = {
  url: string;
  title: string;
};

export default function ReadPDF({ url, title }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!url || !title) {
      router.back();
    }
  }, [router]);
  return (
    <div className="pdf-overlay">
      <h4 style={{ textAlign: "center" }}>{title}</h4>
      <PdfViewerWrapper url={url} />
    </div>
  );
}
