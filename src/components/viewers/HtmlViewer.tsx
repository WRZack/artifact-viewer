import React, { useMemo, useEffect, useState } from 'react';
import { ViewerProps } from '../../types';
import './HtmlViewer.css';

export const HtmlViewer: React.FC<ViewerProps> = ({ content, url, artifact }) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Create blob URL for HTML content (more secure than srcDoc)
  useEffect(() => {
    if (content && typeof content === 'string' && !url) {
      const blob = new Blob([content], { type: 'text/html' });
      const objectUrl = URL.createObjectURL(blob);
      setBlobUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
    return () => {};
  }, [content, url]);

  // Determine the source URL
  const srcUrl = useMemo(() => {
    // Prefer explicit URL if provided
    if (url) {
      return url;
    }
    // Use blob URL for content
    return blobUrl;
  }, [url, blobUrl]);

  // Don't render until we have a URL
  if (!srcUrl) {
    return (
      <div className="html-viewer html-viewer-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="html-viewer">
      <iframe
        className="html-iframe"
        src={srcUrl}
        title={`HTML Preview: ${artifact.name}`}
        // Security-focused sandbox: no allow-same-origin for proper isolation
        // allow-scripts is needed for interactive content but keeps isolation
        sandbox="allow-scripts allow-popups allow-forms"
        // Additional security attributes
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
