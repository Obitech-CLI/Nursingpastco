"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => <p>Preparing PDF viewer...</p>,
});

interface PdfViewerWrapperProps {
  url: string;
}

export default function PdfViewerWrapper({ url }: PdfViewerWrapperProps) {
  return <PdfViewer url={url} />;
}
