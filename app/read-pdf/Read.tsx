"use client";

import PdfViewerWrapper from "../components/PdfViewerWrapper";

type Props = {
  url: string;
  title: string;
};

export default function ReadPDF({ url, title }: Props) {
  return (
    <div className="pdf-overlay">
      <h2>read online</h2>
      <h3>Read {title}</h3>
      <PdfViewerWrapper url={url} />
    </div>
  );
}
