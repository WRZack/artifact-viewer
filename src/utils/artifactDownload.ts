import { Artifact } from '../types';

/**
 * Download an artifact as a file by constructing a Blob from its content
 * and triggering a browser download via an anchor element.
 */
export function downloadArtifact(artifact: Artifact) {
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
}

/**
 * Convenience alias for {@link downloadArtifact}.
 */
export function handleDownload(artifact: Artifact) {
  downloadArtifact(artifact);
}
