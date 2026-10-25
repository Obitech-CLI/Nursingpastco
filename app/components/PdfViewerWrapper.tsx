"use client";

import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="loading">
      <h3 style={{ margin: "1rem 0 1rem" }}>Preparing PDF viewer...</h3>
      <p>hold on! this won't take long</p>
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
