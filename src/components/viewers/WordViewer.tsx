import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { ViewerProps } from '../../types';
import './WordViewer.css';

export const WordViewer: React.FC<ViewerProps> = ({ content, url, artifact }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const convertWord = async () => {
      const source = url || content;
      if (!source) return;

      setLoading(true);
      setError(null);

      try {
        let arrayBuffer: ArrayBuffer;

        if (source instanceof ArrayBuffer) {
          arrayBuffer = source;
        } else if (typeof source === 'string') {
          // Handle base64 encoded content
          if (source.startsWith('data:')) {
            const base64 = source.split(',')[1];
            const binaryString = atob(base64);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            arrayBuffer = bytes.buffer;
          } else {
            // Fetch from URL
            const response = await fetch(source);
            arrayBuffer = await response.arrayBuffer();
          }
        } else {
          arrayBuffer = source;
        }

        const result = await mammoth.convertToHtml({ arrayBuffer }, {
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
          ]
        });
        
        setHtmlContent(result.value);
        setLoading(false);
      } catch (err) {
        console.error('Error converting Word document:', err);
        setError('Failed to convert Word document');
        setLoading(false);
      }
    };

    convertWord();
  }, [content, url]);

  if (error) {
    return (
      <div className="word-viewer word-error">
        <div className="word-info">
          <p>⚠️ Error Loading Document</p>
          <small>{artifact.name}</small>
        </div>
        <div className="word-message error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="word-viewer">
      <div className="word-info">
        <p>📄 Word Document Preview</p>
        <small>{artifact.name}</small>
      </div>
      <div className="word-content-container">
        {loading ? (
          <div className="word-loading">Loading document...</div>
        ) : (
          <div 
            className="word-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
    </div>
  );
};
