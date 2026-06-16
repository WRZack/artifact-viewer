import React, { useMemo, useState } from 'react';
import { marked } from 'marked';
import { ViewerProps } from '../../types';
import './MarkdownViewer.css';

export const MarkdownViewer: React.FC<ViewerProps> = ({ content, showSource }) => {
  const markdownContent = typeof content === 'string' ? content : '';
  const [viewMode, setViewMode] = useState<'rendered' | 'source'>(showSource ? 'source' : 'rendered');

  const htmlContent = useMemo(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    return marked(markdownContent);
  }, [markdownContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      const btn = document.activeElement as HTMLButtonElement;
      if (btn) {
        const original = btn.textContent;
        btn.textContent = '✓ 已复制';
        setTimeout(() => { btn.textContent = original; }, 1500);
      }
    });
  };

  return (
    <div className="markdown-viewer-wrapper">
      <div className="markdown-toolbar">
        <span className="markdown-toolbar-label">Markdown</span>
        <div className="markdown-toolbar-actions">
          <button
            className={`markdown-toolbar-btn ${viewMode === 'rendered' ? 'active' : ''}`}
            onClick={() => setViewMode('rendered')}
            title="渲染预览"
          >
            🎨 渲染预览
          </button>
          <button
            className={`markdown-toolbar-btn ${viewMode === 'source' ? 'active' : ''}`}
            onClick={() => setViewMode('source')}
            title="查看原文"
          >
            📄 查看原文
          </button>
          <button
            className="markdown-toolbar-btn"
            onClick={handleCopy}
            title="复制原文内容"
          >
            📋 复制
          </button>
        </div>
      </div>
      {viewMode === 'rendered' ? (
        <div
          className="markdown-body markdown-rendered"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="markdown-source-view">
          <pre className="markdown-source-content">
            <code>{markdownContent}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
