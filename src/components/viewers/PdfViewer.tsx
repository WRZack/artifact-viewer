import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ViewerProps } from '../../types';
import './PdfViewer.css';

// Set up PDF.js worker using local copy
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const PdfViewer: React.FC<ViewerProps> = ({ content, url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.5);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfReady, setPdfReady] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  // Render page function
  const renderPage = useCallback(async (pageNum: number, renderScale: number) => {
    const pdf = pdfDocRef.current;
    const canvas = canvasRef.current;
    
    if (!pdf || !canvas) return;

    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: renderScale });

      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
    }
  }, []);

  // Load PDF
  useEffect(() => {
    const loadPdf = async () => {
      const source = url || content;
      if (!source) return;

      setLoading(true);
      setError(null);
      setPdfReady(false);

      try {
        let pdfData: ArrayBuffer | Uint8Array;
        if (source instanceof ArrayBuffer) {
          pdfData = source;
        } else if (typeof source === 'string') {
          if (source.startsWith('data:')) {
            const base64 = source.split(',')[1];
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            pdfData = bytes;
          } else {
            const response = await fetch(source);
            if (!response.ok) {
              throw new Error(`Failed to fetch PDF: ${response.status}`);
            }
            pdfData = await response.arrayBuffer();
          }
        } else {
          pdfData = source;
        }

        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoading(false);
        setPdfReady(true);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF document');
        setLoading(false);
      }
    };

    loadPdf();

    return () => {
      pdfDocRef.current = null;
      setPdfReady(false);
    };
  }, [content, url]);

  // Render when PDF is ready or page/scale changes
  useEffect(() => {
    if (pdfReady) {
      renderPage(currentPage, scale);
    }
  }, [pdfReady, currentPage, scale, renderPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));

  if (error) {
    return (
      <div className="pdf-viewer pdf-error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <div className="pdf-nav-controls">
          <button
            className="pdf-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className="pdf-page-info">
            Page {currentPage} of {numPages}
          </span>
          <button
            className="pdf-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === numPages}
          >
            Next →
          </button>
        </div>
        <div className="pdf-zoom-controls">
          <button className="pdf-btn" onClick={zoomOut} disabled={scale <= 0.5}>
            −
          </button>
          <span className="pdf-zoom-info">{Math.round(scale * 100)}%</span>
          <button className="pdf-btn" onClick={zoomIn} disabled={scale >= 3}>
            +
          </button>
        </div>
      </div>
      <div className="pdf-canvas-container">
        {loading ? (
          <div className="pdf-loading">Loading PDF...</div>
        ) : (
          <canvas ref={canvasRef} className="pdf-canvas" />
        )}
      </div>
    </div>
  );
};
