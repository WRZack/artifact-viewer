import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ViewerProps } from '../../types';
import './PdfViewer.css';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const PdfViewer: React.FC<ViewerProps> = ({ content }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    if (content instanceof ArrayBuffer) {
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      // Load PDF document to get page count
      pdfjsLib.getDocument(url).promise.then((pdf) => {
        setNumPages(pdf.numPages);
      });

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [content]);

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button
          className="pdf-btn"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span className="pdf-page-info">
          Page {currentPage} of {numPages}
        </span>
        <button
          className="pdf-btn"
          onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
          disabled={currentPage === numPages}
        >
          Next →
        </button>
      </div>
      <iframe
        className="pdf-iframe"
        src={`${pdfUrl}#page=${currentPage}`}
        title="PDF Preview"
      />
    </div>
  );
};
