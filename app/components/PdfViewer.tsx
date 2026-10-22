"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./pdfviewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setPage(1);
      setLoading(false);
      setError("");
    },
    [],
  );

  const handleLoadError = useCallback((err: Error) => {
    console.error("PDF loading failed:", err);
    setLoading(false);
    setError("Unable to load this PDF. Please try again.");
  }, []);

  return (
    <section className="pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-controls">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            disabled={zoom <= 0.5}
            aria-label="Zoom out"
          >
            −
          </button>

          <span>{Math.round(zoom * 100)}%</span>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            disabled={zoom >= 3}
            aria-label="Zoom in"
          >
            +
          </button>

          <button type="button" onClick={() => setZoom(1)}>
            Reset
          </button>
        </div>

        <div className="pdf-controls">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || numPages === 0}
          >
            Previous
          </button>

          <span aria-live="polite">
            {numPages > 0 ? `${page} / ${numPages}` : "— / —"}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            disabled={page >= numPages || numPages === 0}
          >
            Next
          </button>
        </div>
      </div>

      <div className="pdf-scroll" ref={containerRef}>
        {error ? (
          <p className="pdf-message" role="alert">
            {error}
          </p>
        ) : (
          <Document
            key={url}
            file={url}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            loading={<p className="pdf-message">Loading PDF...</p>}
            error={<p className="pdf-message">Unable to load this PDF.</p>}
            noData={<p className="pdf-message">No PDF URL provided.</p>}
          >
            {width > 0 && numPages > 0 && (
              <Page
                pageNumber={page}
                width={width}
                scale={zoom}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={<p className="pdf-message">Rendering page...</p>}
              />
            )}
          </Document>
        )}
      </div>

      {!error && loading && <p className="pdf-status">Preparing document...</p>}
    </section>
  );
}
