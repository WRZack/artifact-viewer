import React from 'react';
import { Artifact, ArtifactType } from '../types';
import { CodeViewer } from './viewers/CodeViewer';
import { HtmlViewer } from './viewers/HtmlViewer';
import { MarkdownViewer } from './viewers/MarkdownViewer';
import { PdfViewer } from './viewers/PdfViewer';
import { WordViewer } from './viewers/WordViewer';
import { ImageViewer } from './viewers/ImageViewer';
import './DynamicArtifactViewer.css';

interface DynamicArtifactViewerProps {
  artifacts: Artifact[] | Artifact;
  defaultArtifactId?: string;
  onArtifactChange?: (artifact: Artifact) => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const DynamicArtifactViewer: React.FC<DynamicArtifactViewerProps> = ({
  artifacts,
  defaultArtifactId,
  onArtifactChange,
  onClose,
  className = '',
  style = {},
}) => {
  const artifactList = Array.isArray(artifacts) ? artifacts : [artifacts];
  const [currentArtifact, setCurrentArtifact] = React.useState<Artifact>(
    defaultArtifactId
      ? artifactList.find((a) => a.id === defaultArtifactId) || artifactList[0]
      : artifactList[0]
  );
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showSource, setShowSource] = React.useState(false);

  React.useEffect(() => {
    onArtifactChange?.(currentArtifact);
  }, [currentArtifact, onArtifactChange]);

  const handleArtifactChange = (artifactId: string) => {
    const artifact = artifactList.find((a) => a.id === artifactId);
    if (artifact) {
      setCurrentArtifact(artifact);
      setShowSource(false);
    }
  };

  const handleDownload = () => {
    downloadArtifact(currentArtifact);
  };

  const downloadArtifact = (artifact: Artifact) => {
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
          data =
            typeof artifact.content === 'string'
              ? artifact.content
              : JSON.stringify(artifact.content, null, 2);
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

  const renderViewer = () => {
    if (showSource && (currentArtifact.type === 'code' || currentArtifact.type === 'markdown')) {
      if (currentArtifact.type === 'markdown') {
        return (
          <MarkdownViewer
            content={currentArtifact.content as string}
            artifact={currentArtifact}
            showSource={true}
          />
        );
      }
      return (
        <CodeViewer
          content={currentArtifact.content as string}
          artifact={currentArtifact}
          language={currentArtifact.language}
        />
      );
    }

    switch (currentArtifact.type) {
      case 'html':
        return (
          <HtmlViewer
            content={currentArtifact.content as string}
            artifact={currentArtifact}
          />
        );
      case 'markdown':
        return (
          <MarkdownViewer
            content={currentArtifact.content as string}
            artifact={currentArtifact}
            showSource={showSource}
          />
        );
      case 'pdf':
        return (
          <PdfViewer
            content={currentArtifact.content as ArrayBuffer}
            url={currentArtifact.url}
            artifact={currentArtifact}
          />
        );
      case 'docx':
      case 'word':
        return (
          <WordViewer
            content={currentArtifact.content as ArrayBuffer}
            url={currentArtifact.url}
            artifact={currentArtifact}
          />
        );
      case 'image':
        return (
          <ImageViewer
            content={currentArtifact.content as string}
            url={currentArtifact.url}
            artifact={currentArtifact}
          />
        );
      case 'code':
        return (
          <CodeViewer
            content={currentArtifact.content as string}
            artifact={currentArtifact}
            language={currentArtifact.language}
          />
        );
      case 'json':
        return (
          <CodeViewer
            content={
              typeof currentArtifact.content === 'string'
                ? currentArtifact.content
                : JSON.stringify(currentArtifact.content, null, 2)
            }
            artifact={currentArtifact}
            language="json"
          />
        );
      default:
        return (
          <div className="viewer-default">
            <p>Unable to preview artifact type: {currentArtifact.type}</p>
            <pre>{String(currentArtifact.content).substring(0, 1000)}</pre>
          </div>
        );
    }
  };

  const getTypeColor = (type: ArtifactType) => {
    const colors: Record<ArtifactType, string> = {
      html: '#e34c26',
      markdown: '#083fa1',
      pdf: '#d40000',
      docx: '#0078d4',
      word: '#0078d4',
      code: '#3178c6',
      image: '#ffa726',
      json: '#fcbe4d',
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div
      className={`dynamic-artifact-viewer ${isFullscreen ? 'fullscreen' : ''} ${className}`}
      style={style}
    >
      <div className="viewer-header">
        <div className="viewer-title">
          <h2>{currentArtifact.name}</h2>
          <span
            className="type-badge"
            style={{ backgroundColor: getTypeColor(currentArtifact.type) }}
          >
            {currentArtifact.type.toUpperCase()}
          </span>
        </div>
        <div className="viewer-toolbar">
          {(currentArtifact.type === 'code' || currentArtifact.type === 'markdown') && (
            <button
              className="toolbar-btn"
              onClick={() => setShowSource(!showSource)}
              title={currentArtifact.type === 'markdown' ? '切换原文 / 渲染预览' : 'Toggle source view'}
            >
              {showSource ? (currentArtifact.type === 'markdown' ? '🎨 渲染预览' : '🎨 Preview') : '📄 原文'}
            </button>
          )}
          <button
            className="toolbar-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle fullscreen"
          >
            {isFullscreen ? '⛔ Exit Fullscreen' : '🖥️ Fullscreen'}
          </button>
          <button
            className="toolbar-btn"
            onClick={handleDownload}
            title="Download artifact"
          >
            ⬇️ Download
          </button>
          {onClose && (
            <button
              className="toolbar-btn close-btn"
              onClick={onClose}
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {artifactList.length > 1 && (
        <div className="viewer-tabs">
          {artifactList.map((artifact) => (
            <button
              key={artifact.id}
              className={`tab-btn ${currentArtifact.id === artifact.id ? 'active' : ''}`}
              onClick={() => handleArtifactChange(artifact.id)}
              style={{
                borderBottomColor:
                  currentArtifact.id === artifact.id
                    ? getTypeColor(artifact.type)
                    : 'transparent',
              }}
            >
              <span
                className="tab-dot"
                style={{ backgroundColor: getTypeColor(artifact.type) }}
              />
              <span className="tab-name">{artifact.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="viewer-content">{renderViewer()}</div>
    </div>
  );
};
