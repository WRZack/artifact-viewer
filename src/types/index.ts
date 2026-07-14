export type ArtifactType = 'html' | 'markdown' | 'pdf' | 'docx' | 'word' | 'code' | 'image' | 'json';

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  content?: string | ArrayBuffer; // content or URL for binary formats
  url?: string; // URL to fetch the file from
  language?: string; // For code files
  createdAt?: Date;
  updatedAt?: Date;
  metadata?: Record<string, any>;
}

export interface ArtifactViewerProps {
  artifact: Artifact;
  onClose?: () => void;
  onDownload?: (artifact: Artifact) => void;
  fullscreen?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface ViewerProps {
  content?: string | ArrayBuffer;
  url?: string;
  artifact: Artifact;
  showSource?: boolean;
  onDownload?: () => void;
  showToolbar?: boolean;
  toolbarActions?: React.ReactNode;
  viewMode?: 'rendered' | 'source';
}
