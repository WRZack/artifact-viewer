import React from 'react';
import { ViewerProps } from '../../types';
import './HtmlViewer.css';

export const HtmlViewer: React.FC<ViewerProps> = ({ content }) => {
  const htmlContent = typeof content === 'string' ? content : '';

  return (
    <div className="html-viewer">
      <iframe
        className="html-iframe"
        srcDoc={htmlContent}
        title="HTML Preview"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};
