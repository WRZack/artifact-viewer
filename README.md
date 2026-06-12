# Artifact Viewer

A powerful React + TypeScript library for displaying agent artifacts in multiple formats: HTML, Markdown, PDF, Word, Code, Images, and JSON.

## Features

✨ **Multi-Format Support**
- HTML with sandbox isolation
- Markdown with GitHub-flavored rendering
- PDF with page navigation
- Word/DOCX documents via Office Online Viewer
- Code files with syntax highlighting (highlight.js)
- Images with zoom functionality
- JSON with code highlighting

✨ **Developer-Friendly**
- TypeScript with full type safety
- React 18+ components
- Zero external dependencies (except React)
- Fully customizable styling
- Responsive design

✨ **User Experience**
- Fullscreen mode
- Download functionality
- Source code toggle for code artifacts
- Intuitive controls and navigation
- Mobile-friendly interface

## Installation

```bash
npm install artifact-viewer
# or
yarn add artifact-viewer
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { ArtifactViewer, Artifact } from 'artifact-viewer';

function App() {
  const artifact: Artifact = {
    id: '1',
    name: 'Example Component',
    type: 'html',
    content: '<h1>Hello World</h1><p>This is a preview</p>',
  };

  return (
    <div>
      <ArtifactViewer artifact={artifact} />
    </div>
  );
}

export default App;
```

## API Reference

### ArtifactViewer Props

```tsx
interface ArtifactViewerProps {
  artifact: Artifact;              // The artifact to display
  onClose?: () => void;            // Called when close button is clicked
  onDownload?: (artifact: Artifact) => void; // Called when download is requested
  fullscreen?: boolean;            // Start in fullscreen mode
  className?: string;              // Custom CSS class
  style?: React.CSSProperties;     // Custom inline styles
}
```

### Artifact Type

```tsx
interface Artifact {
  id: string;                      // Unique identifier
  name: string;                    // Display name
  type: ArtifactType;              // 'html' | 'markdown' | 'pdf' | 'docx' | 'code' | 'image' | 'json'
  content: string | ArrayBuffer;   // File content or URL
  language?: string;               // Programming language (for code)
  createdAt?: Date;                // Creation timestamp
  updatedAt?: Date;                // Last update timestamp
  metadata?: Record<string, any>;  // Custom metadata
}
```

## Examples

### HTML Artifact

```tsx
const htmlArtifact: Artifact = {
  id: 'html-1',
  name: 'My Component',
  type: 'html',
  content: `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>Welcome</h1>
        <p>This is a sandboxed HTML preview.</p>
      </body>
    </html>
  `,
};
```

### Markdown Artifact

```tsx
const markdownArtifact: Artifact = {
  id: 'md-1',
  name: 'Documentation',
  type: 'markdown',
  content: `
# My Project

## Features

- Feature 1
- Feature 2
- Feature 3

\`\`\`javascript
const hello = () => console.log('Hello');
\`\`\`
  `,
};
```

### Code Artifact

```tsx
const codeArtifact: Artifact = {
  id: 'code-1',
  name: 'app.tsx',
  type: 'code',
  language: 'typescript',
  content: `
import React from 'react';

const App = () => {
  return <h1>Hello World</h1>;
};

export default App;
  `,
};
```

### PDF Artifact

```tsx
const pdfArtifact: Artifact = {
  id: 'pdf-1',
  name: 'Report.pdf',
  type: 'pdf',
  content: pdfArrayBuffer, // ArrayBuffer from file upload or fetch
};
```

### Word Artifact

```tsx
const wordArtifact: Artifact = {
  id: 'docx-1',
  name: 'Document.docx',
  type: 'docx',
  content: docxArrayBuffer, // ArrayBuffer from file upload
};
```

### Image Artifact

```tsx
const imageArtifact: Artifact = {
  id: 'img-1',
  name: 'screenshot.png',
  type: 'image',
  content: 'data:image/png;base64,...', // Base64 or URL
};
```

## Styling

The library uses CSS classes that can be customized:

```css
/* Main container */
.artifact-viewer {
  /* Your custom styles */
}

/* Header section */
.artifact-header {
  /* Your custom styles */
}

/* Content area */
.artifact-content {
  /* Your custom styles */
}

/* Fullscreen mode */
.artifact-viewer.fullscreen {
  /* Your custom styles */
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build library
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
