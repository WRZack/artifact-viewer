import React, { useMemo } from 'react';
import { marked } from 'marked';
import { ViewerProps } from '../../types';
import './MarkdownViewer.css';

export const MarkdownViewer: React.FC<ViewerProps> = ({ content }) => {
  const markdownContent = typeof content === 'string' ? content : '';

  const htmlContent = useMemo(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    return marked(markdownContent);
  }, [markdownContent]);

  return (
    <div
      className="markdown-viewer markdown-body"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
