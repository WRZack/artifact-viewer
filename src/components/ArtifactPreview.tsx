import React from 'react';
import { Artifact } from '../types';
import { CodeViewer } from './viewers/CodeViewer';
import { HtmlViewer } from './viewers/HtmlViewer';
import { MarkdownViewer } from './viewers/MarkdownViewer';
import { PdfViewer } from './viewers/PdfViewer';
import { WordViewer } from './viewers/WordViewer';
import { ImageViewer } from './viewers/ImageViewer';
import './ArtifactPreview.css';

interface ArtifactPreviewProps {
  artifact: Artifact;
  showSource?: boolean;
  onDownload?: () => void;
}

export const ArtifactPreview: React.FC<ArtifactPreviewProps> = ({
  artifact,
  showSource = false,
  onDownload,
}) => {
  const renderViewer = () => {
    // Show source code for code files
    if (showSource && artifact.type === 'code') {
      return <CodeViewer content={artifact.content as string} artifact={artifact} />;
    }

    switch (artifact.type) {
      case 'html':
        return <HtmlViewer content={artifact.content as string} artifact={artifact} />;
      case 'markdown':
        return <MarkdownViewer content={artifact.content as string} artifact={artifact} />;
      case 'pdf':
        return <PdfViewer content={artifact.content as ArrayBuffer} artifact={artifact} />;
      case 'docx':
      case 'word':
        return <WordViewer content={artifact.content as ArrayBuffer} artifact={artifact} />;
      case 'image':
        return <ImageViewer content={artifact.content as string} artifact={artifact} />;
      case 'code':
        return (
          <CodeViewer
            content={artifact.content as string}
            artifact={artifact}
            language={artifact.language}
          />
        );
      case 'json':
        return (
          <CodeViewer
            content={typeof artifact.content === 'string' ? artifact.content : JSON.stringify(artifact.content, null, 2)}
            artifact={artifact}
            language="json"
          />
        );
      default:
        return (
          <div className="viewer-default">
            <p>Unable to preview artifact type: {artifact.type}</p>
            <pre>{String(artifact.content).substring(0, 1000)}</pre>
          </div>
        );
    }
  };

  return <div className="artifact-preview">{renderViewer()}</div>;
};
