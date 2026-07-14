import React, { useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';
import type { ViewerProps } from '../../types';
import { loadBinaryArtifact } from '../../utils/loadBinaryArtifact';
import './MarkdownViewer.css';

function isArtifactUrl(value: string) {
  return /^https?:\/\//i.test(value) || value.startsWith('/api/');
}

export const MarkdownViewer: React.FC<ViewerProps & { simple?: boolean }> = ({
  content,
  url,
  simple = false,
  showSource,
  showToolbar = true,
  toolbarActions,
  viewMode: externalViewMode,
}) => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState<string | null>(null);
  const [internalViewMode, setInternalViewMode] = useState<'rendered' | 'source'>(showSource ? 'source' : 'rendered');

  // Use external viewMode if provided, otherwise fall back to internal state
  const viewMode = externalViewMode ?? internalViewMode;
  const isExternalControlled = externalViewMode !== undefined;

  useEffect(() => {
    let canceled = false;

    const loadMarkdown = async () => {
      const source = url || content;
      const sourceUrl = url || (typeof content === 'string' && isArtifactUrl(content) ? content : '');

      if (!source) {
        setMarkdownContent('');
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let text = '';

        if (sourceUrl) {
          const data = await loadBinaryArtifact(sourceUrl);
          text = new TextDecoder('utf-8').decode(data);
        } else if (typeof source === 'string') {
          text = source;
        } else {
          text = new TextDecoder('utf-8').decode(source);
        }

        if (!canceled) {
          setMarkdownContent(text);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading Markdown document:', err);
        if (!canceled) {
          setError('Failed to load Markdown document');
          setLoading(false);
        }
      }
    };

    loadMarkdown();

    return () => {
      canceled = true;
    };
  }, [content, url]);

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
      {showToolbar && (
        <div className="markdown-toolbar">
          <span className="markdown-toolbar-label">Markdown</span>
          <div className="markdown-toolbar-actions">
            <button
              className={`markdown-toolbar-btn ${viewMode === 'rendered' ? 'active' : ''}`}
              onClick={() => !isExternalControlled && setInternalViewMode('rendered')}
              title="渲染预览"
              disabled={isExternalControlled}
            >
              🎨 渲染预览
            </button>
            <button
              className={`markdown-toolbar-btn ${viewMode === 'source' ? 'active' : ''}`}
              onClick={() => !isExternalControlled && setInternalViewMode('source')}
              title="查看原文"
              disabled={isExternalControlled}
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
            {toolbarActions}
          </div>
        </div>
      )}
      {error ? (
        <div className="markdown-state markdown-error">{error}</div>
      ) : loading ? (
        <div className="markdown-state">Loading Markdown...</div>
      ) : viewMode === 'rendered' ? (
        <div
          className={`markdown-body ${simple ? 'markdown-simple' : ''} markdown-rendered`}
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
