import React, { useState } from 'react';
import { ArtifactViewerProps } from '../types';
import { ArtifactPreview } from './ArtifactPreview';
import './ArtifactViewer.css';

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  artifact,
  onClose,
  onDownload,
  fullscreen = false,
  className = '',
  style = {},
}) => {
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showSource, setShowSource] = useState(false);

  const handleDownload = () => {
    onDownload?.(artifact);
    downloadArtifact(artifact);
  };

  const downloadArtifact = (artifact: typeof artifact) => {
    try {
      let data: BlobPart;
      let mimeType = 'text/plain';
      let extension = '.txt';

      switch (artifact.type) {
        case 'html':
          data = artifact.content as string;
          mimeType = 'text/html';
          extension = '.html';
          break;
        case 'markdown':
          data = artifact.content as string;
          mimeType = 'text/markdown';
          extension = '.md';
          break;
        case 'json':
          data = typeof artifact.content === 'string' ? artifact.content : JSON.stringify(artifact.content, null, 2);
          mimeType = 'application/json';
          extension = '.json';
          break;
        case 'pdf':
          data = artifact.content as ArrayBuffer;
          mimeType = 'application/pdf';
          extension = '.pdf';
          break;
        case 'docx':
        case 'word':
          data = artifact.content as ArrayBuffer;
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          extension = '.docx';
          break;
        default:
          data = artifact.content as string;
      }

      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${artifact.name}${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div
      className={`artifact-viewer ${isFullscreen ? 'fullscreen' : ''} ${className}`}
      style={style}
    >
      <div className="artifact-header">
        <div className="artifact-info">
          <h2>{artifact.name}</h2>
          <span className="artifact-type-badge">{artifact.type.toUpperCase()}</span>
        </div>
        <div className="artifact-controls">
          {artifact.type === 'code' && (
            <button
              className="control-btn"
              onClick={() => setShowSource(!showSource)}
              title="Toggle source view"
            >
              {showSource ? '👁️ Preview' : '📄 Source'}
            </button>
          )}
          <button
            className="control-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle fullscreen"
          >
            {isFullscreen ? '⛔ Exit Fullscreen' : '🔲 Fullscreen'}
          </button>
          <button
            className="control-btn"
            onClick={handleDownload}
            title="Download artifact"
          >
            ⬇️ Download
          </button>
          {onClose && (
            <button
              className="control-btn close-btn"
              onClick={onClose}
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="artifact-content">
        <ArtifactPreview
          artifact={artifact}
          showSource={showSource}
          onDownload={() => handleDownload()}
        />
      </div>
    </div>
  );
};
