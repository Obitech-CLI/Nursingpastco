"use client";

import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="loading">
      <p>Preparing PDF viewer...</p>
      <ClipLoader size={50} color="var(--bg-txt)" />
    </div>
  ),
});

interface PdfViewerWrapperProps {
  url: string;
}

export default function PdfViewerWrapper({ url }: PdfViewerWrapperProps) {
  return <PdfViewer url={url} />;
}
