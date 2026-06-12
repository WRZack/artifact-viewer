import React, { useState } from 'react';
import { ViewerProps } from '../../types';
import './ImageViewer.css';

export const ImageViewer: React.FC<ViewerProps> = ({ content, url, artifact }) => {
  const [zoom, setZoom] = useState(1);
  const imageSrc = url || (typeof content === 'string' ? content : (content ? URL.createObjectURL(new Blob([content])) : ''));

  return (
    <div className="image-viewer">
      <div className="image-controls">
        <button className="zoom-btn" onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}>
          🔍-
        </button>
        <span className="zoom-info">{Math.round(zoom * 100)}%</span>
        <button className="zoom-btn" onClick={() => setZoom(Math.min(3, zoom + 0.25))}>
          🔍+
        </button>
        <button className="zoom-btn" onClick={() => setZoom(1)}>Reset</button>
      </div>
      <div className="image-container">
        <img
          src={imageSrc}
          alt={artifact.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s',
          }}
        />
      </div>
    </div>
  );
};
