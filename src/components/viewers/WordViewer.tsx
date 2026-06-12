import React from 'react';
import { ViewerProps } from '../../types';
import './WordViewer.css';

export const WordViewer: React.FC<ViewerProps> = ({ content, artifact }) => {
  const base64Content =
    content instanceof ArrayBuffer
      ? btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(content))))
      : content;

  // Office Online Viewer URL (requires CORS setup)
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64Content}`;

  return (
    <div className="word-viewer">
      <div className="word-info">
        <p>📄 Word Document Preview</p>
        <small>{artifact.name}</small>
      </div>
      <div className="word-message">
        <p>
          This Word document preview is provided by Microsoft Office Online. If the preview doesn't
          load, please download the document directly.
        </p>
      </div>
      <iframe
        className="word-iframe"
        src={viewerUrl}
        title="Word Document Preview"
        frameBorder="0"
      />
    </div>
  );
};
