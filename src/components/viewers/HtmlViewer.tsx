import React, { useEffect, useMemo, useState } from 'react';
import type { ViewerProps } from '../../types';
import { loadBinaryArtifact } from '../../utils/loadBinaryArtifact';
import { CodeViewer } from './CodeViewer';
import './HtmlViewer.css';

function isArtifactUrl(value: string) {
  return /^https?:\/\//i.test(value) || value.startsWith('/api/');
}

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectBaseHref(html: string, sourceUrl: string) {
  if (!sourceUrl || /<base\s/i.test(html)) {
    return html;
  }

  const baseHref = new URL(sourceUrl, window.location.href).href;
  const baseTag = `<base href="${escapeHtmlAttribute(baseHref)}">`;

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${baseTag}`);
  }

  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html([^>]*)>/i, `<html$1><head>${baseTag}</head>`);
  }

  return `<!doctype html><html><head>${baseTag}</head><body>${html}</body></html>`;
}

const scrollbarStyle = `<style data-html-viewer-scrollbar>
* {
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  min-height: 40px;
  border: 2px solid transparent;
  border-radius: 999px;
  background: transparent;
  background-clip: content-box;
}

*::-webkit-scrollbar-corner {
  background: transparent;
}

*:hover,
.scrollbar-scrolling {
  scrollbar-color: rgba(26, 27, 29, 0.20) transparent;
}

*:hover::-webkit-scrollbar-thumb,
.scrollbar-scrolling::-webkit-scrollbar-thumb {
  background-color: rgba(26, 27, 29, 0.20);
}

*:hover::-webkit-scrollbar-thumb:hover,
.scrollbar-scrolling::-webkit-scrollbar-thumb:hover {
  background-color: rgba(26, 27, 29, 0.28);
}
</style>`;

const scrollbarScript = `<script data-html-viewer-scrollbar>
(() => {
  const scrollingClassName = 'scrollbar-scrolling';
  const scrollIdleDelay = 800;
  const scrollIdleTimers = new WeakMap();

  function getScrollTarget(target) {
    if (target instanceof Document) {
      return target.scrollingElement;
    }

    if (target instanceof Element) {
      return target;
    }

    return document.scrollingElement;
  }

  function markScrolling(event) {
    const scrollTarget = getScrollTarget(event.target);

    if (!scrollTarget) {
      return;
    }

    scrollTarget.classList.add(scrollingClassName);

    const existingTimer = scrollIdleTimers.get(scrollTarget);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    const nextTimer = window.setTimeout(() => {
      scrollTarget.classList.remove(scrollingClassName);
      scrollIdleTimers.delete(scrollTarget);
    }, scrollIdleDelay);

    scrollIdleTimers.set(scrollTarget, nextTimer);
  }

  document.addEventListener('scroll', markScrolling, {
    capture: true,
    passive: true,
  });
})();
</script>`;

function injectHtmlViewerScrollbar(html: string) {
  const scrollbarHeadContent = `${scrollbarStyle}${scrollbarScript}`;

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${scrollbarHeadContent}`);
  }

  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html([^>]*)>/i, `<html$1><head>${scrollbarHeadContent}</head>`);
  }

  return `<!doctype html><html><head>${scrollbarHeadContent}</head><body>${html}</body></html>`;
}

export const HtmlViewer: React.FC<ViewerProps> = ({ content, url, artifact, viewMode }) => {
  const sourceUrl = useMemo(() => {
    if (url) {
      return url;
    }
    if (typeof content === 'string' && isArtifactUrl(content)) {
      return content;
    }

    return '';
  }, [content, url]);

  const inlineHtml = typeof content === 'string' && !sourceUrl ? content : '';
  const [sourceHtml, setSourceHtml] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(sourceUrl || inlineHtml));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    let objectUrl: string | null = null;

    const loadHtml = async () => {
      const source = sourceUrl || inlineHtml;

      if (!source) {
        setPreviewUrl(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const html = sourceUrl
          ? new TextDecoder('utf-8').decode(await loadBinaryArtifact(sourceUrl))
          : inlineHtml;
        const previewHtml = injectHtmlViewerScrollbar(injectBaseHref(html, sourceUrl));

        objectUrl = URL.createObjectURL(new Blob([previewHtml], { type: 'text/html' }));

        if (!canceled) {
          setSourceHtml(html);
          setPreviewUrl(objectUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading HTML document:', err);
        if (!canceled) {
          setSourceHtml('');
          setPreviewUrl(null);
          setError('Failed to load HTML document');
          setLoading(false);
        }
      }
    };

    loadHtml();

    return () => {
      canceled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [inlineHtml, sourceUrl]);

  if (error) {
    return (
      <div className="html-viewer html-viewer-loading">
        <p>{error}</p>
      </div>
    );
  }

  // Don't render until we have a URL
  if (loading || !previewUrl) {
    return (
      <div className="html-viewer html-viewer-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (viewMode === 'source') {
    return <CodeViewer artifact={artifact} content={sourceHtml} language="html" />;
  }

  return (
    <div className="html-viewer">
      <iframe
        className="html-iframe"
        src={previewUrl}
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
