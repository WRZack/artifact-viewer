import React, { useEffect } from 'react';
import { ViewerProps } from '../../types';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './CodeViewer.css';

interface CodeViewerProps extends ViewerProps {
  language?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  content,
  artifact,
  language,
}) => {
  const codeContent = typeof content === 'string' ? content : '';
  const detectedLanguage = language || detectLanguage(artifact.name, codeContent);

  useEffect(() => {
    const codeElements = document.querySelectorAll('pre code');
    codeElements.forEach((element) => {
      hljs.highlightElement(element as HTMLElement);
    });
  }, [codeContent]);

  const lines = codeContent.split('\n');
  const maxLineNumber = lines.length.toString().length;

  return (
    <div className="code-viewer">
      <div className="code-header">
        <span className="code-language">{detectedLanguage}</span>
        <button
          className="code-copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(codeContent);
            alert('Code copied to clipboard!');
          }}
        >
          📋 Copy
        </button>
      </div>
      <pre className="code-container">
        <code className={`language-${detectedLanguage}`}>{codeContent}</code>
      </pre>
    </div>
  );
};

function detectLanguage(filename: string, content: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const extensionMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    cs: 'csharp',
    go: 'go',
    rs: 'rust',
    php: 'php',
    rb: 'ruby',
    swift: 'swift',
    kt: 'kotlin',
    sql: 'sql',
    html: 'html',
    css: 'css',
    json: 'json',
    xml: 'xml',
    yaml: 'yaml',
    yml: 'yaml',
    toml: 'toml',
    sh: 'bash',
    bash: 'bash',
  };

  if (ext && ext in extensionMap) {
    return extensionMap[ext];
  }

  // Try to detect from content
  if (content.includes('import React') || content.includes('from "react"')) {
    return 'typescript';
  }
  if (content.includes('def ') || content.includes('import ')) {
    return 'python';
  }
  if (content.includes('function ') || content.includes('const ')) {
    return 'javascript';
  }

  return 'plaintext';
}
