import React from 'react';
import { DynamicArtifactViewer, Artifact } from '../src/index';
import './App.css';

const App = () => {
  // Sample artifacts for demonstration
  const sampleArtifacts: Artifact[] = [
    {
      id: 'html-1',
      name: 'React Component',
      type: 'html',
      content: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 500px; text-align: center; }
            h1 { color: #333; margin-bottom: 16px; font-size: 32px; }
            p { color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
            .button { display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: transform 0.2s; }
            .button:hover { transform: scale(1.05); }
            .features { margin-top: 32px; text-align: left; }
            .feature { display: flex; align-items: center; margin: 12px 0; color: #666; }
            .feature-icon { width: 24px; height: 24px; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-right: 12px; font-weight: bold; flex-shrink: 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✨ Welcome</h1>
            <p>This is a sandboxed HTML preview rendered in an iframe. You can include any HTML, CSS, and JavaScript here!</p>
            <button class="button">Get Started</button>
            <div class="features">
              <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Fully isolated & safe</span>
              </div>
              <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Interactive components</span>
              </div>
              <div class="feature">
                <div class="feature-icon">✓</div>
                <span>Custom styling</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: 'md-1',
      name: 'README.md',
      type: 'markdown',
      content: `
# Artifact Viewer Library

## Overview

**Artifact Viewer** is a powerful React + TypeScript library for displaying various types of artifacts in a unified, user-friendly interface.

## Supported Formats

### 📄 HTML
Render sandboxed HTML with full CSS and JavaScript support.
\`\`\`html
<h1>Hello World</h1>
<p>This is safe HTML content</p>
\`\`\`

### 📝 Markdown
Beautiful GitHub-flavored Markdown rendering.
\`\`\`markdown
# Heading 1
## Heading 2
- List item 1
- List item 2
\`\`\`

### 🎨 Code
Syntax-highlighted code with multiple language support.
\`\`\`typescript
interface Props {
  name: string;
  age: number;
}
\`\`\`

### 📊 JSON
Formatted JSON viewing with syntax highlighting.
\`\`\`json
{
  "name": "John",
  "age": 30
}
\`\`\`

### 📑 PDF & Word
Native support for PDF and Word document previews.

### 🖼️ Images
Image viewing with zoom and pan capabilities.

## Key Features

- ✅ **Multi-format Support** - HTML, Markdown, PDF, Word, Code, Images, JSON
- ✅ **Zero Dependencies** - Only requires React
- ✅ **TypeScript** - Full type safety
- ✅ **Responsive Design** - Works on all devices
- ✅ **Customizable** - Style and extend easily
- ✅ **Download Support** - Export artifacts
- ✅ **Fullscreen Mode** - Immersive viewing experience

## Getting Started

1. Install the library
2. Import the component
3. Pass your artifact
4. Enjoy!
      `,
    },
    {
      id: 'code-1',
      name: 'example.tsx',
      type: 'code',
      language: 'typescript',
      content: `import React from 'react';
import { DynamicArtifactViewer, Artifact } from 'artifact-viewer';

export default function App() {
  const artifacts: Artifact[] = [
    {
      id: '1',
      name: 'Component',
      type: 'html',
      content: '<h1>Hello</h1>',
    },
    {
      id: '2',
      name: 'Docs',
      type: 'markdown',
      content: '# Welcome to Artifact Viewer',
    },
  ];

  return (
    <div style={{ height: '600px' }}>
      <DynamicArtifactViewer
        artifacts={artifacts}
        defaultArtifactId="1"
        onArtifactChange={(artifact) => {
          console.log('Switched to:', artifact.name);
        }}
      />
    </div>
  );
}`,
    },
    {
      id: 'json-1',
      name: 'config.json',
      type: 'json',
      content: JSON.stringify(
        {
          name: 'artifact-viewer',
          version: '0.1.0',
          description: 'A React + TypeScript library for displaying agent artifacts',
          features: [
            'HTML rendering',
            'Markdown support',
            'PDF viewing',
            'Code highlighting',
            'Image zoom',
            'Word document preview',
          ],
          dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
            marked: '^11.1.1',
            'highlight.js': '^11.9.0',
            'pdfjs-dist': '^4.0.379',
          },
        },
        null,
        2
      ),
    },
  ];

  return (
    <div className="demo-app">
      <header className="demo-header">
        <div className="header-content">
          <h1>🎨 Artifact Viewer Demo</h1>
          <p>A powerful React + TypeScript library for displaying artifacts</p>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <h2>Dynamic Multi-Artifact Viewer</h2>
          <p>
            Click on the tabs below to switch between different artifact types. The viewer
            automatically detects and renders the appropriate component based on the artifact
            type.
          </p>
          <div className="viewer-container">
            <DynamicArtifactViewer
              artifacts={sampleArtifacts}
              defaultArtifactId="html-1"
              onArtifactChange={(artifact) => {
                console.log('Current artifact:', artifact.name, artifact.type);
              }}
            />
          </div>
        </section>

        <section className="demo-section info-section">
          <h2>📚 Supported Formats</h2>
          <div className="formats-grid">
            <div className="format-card">
              <div className="format-icon">🌐</div>
              <h3>HTML</h3>
              <p>Sandboxed iframe rendering with full HTML/CSS/JS support</p>
            </div>
            <div className="format-card">
              <div className="format-icon">📝</div>
              <h3>Markdown</h3>
              <p>GitHub-flavored Markdown with syntax highlighting</p>
            </div>
            <div className="format-card">
              <div className="format-icon">💻</div>
              <h3>Code</h3>
              <p>Multiple language support with syntax highlighting</p>
            </div>
            <div className="format-card">
              <div className="format-icon">📄</div>
              <h3>PDF</h3>
              <p>PDF viewing with page navigation</p>
            </div>
            <div className="format-card">
              <div className="format-icon">📋</div>
              <h3>Word</h3>
              <p>Word/DOCX document preview via Office Online</p>
            </div>
            <div className="format-card">
              <div className="format-icon">🖼️</div>
              <h3>Image</h3>
              <p>Image viewing with zoom and pan capabilities</p>
            </div>
            <div className="format-card">
              <div className="format-icon">📊</div>
              <h3>JSON</h3>
              <p>Formatted JSON with syntax highlighting</p>
            </div>
            <div className="format-card">
              <div className="format-icon">🎁</div>
              <h3>Custom</h3>
              <p>Extensible design for custom artifact types</p>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>✨ Key Features</h2>
          <ul className="features-list">
            <li>✅ <strong>Dynamic Type Detection</strong> - Automatically renders based on artifact type</li>
            <li>✅ <strong>Tab Navigation</strong> - Switch between multiple artifacts easily</li>
            <li>✅ <strong>Fullscreen Mode</strong> - Immersive viewing experience</li>
            <li>✅ <strong>Download Support</strong> - Export any artifact</li>
            <li>✅ <strong>Source Toggle</strong> - View code in source or formatted modes</li>
            <li>✅ <strong>Responsive Design</strong> - Works on desktop, tablet, and mobile</li>
            <li>✅ <strong>TypeScript</strong> - Full type safety and IDE support</li>
            <li>✅ <strong>Zero Dependencies</strong> - Only requires React</li>
          </ul>
        </section>

        <section className="demo-section code-section">
          <h2>📖 Usage Example</h2>
          <pre className="code-block">{`import { DynamicArtifactViewer, Artifact } from 'artifact-viewer';

const artifacts: Artifact[] = [
  {
    id: '1',
    name: 'My Component',
    type: 'html',
    content: '<h1>Hello</h1>',
  },
  {
    id: '2',
    name: 'Documentation',
    type: 'markdown',
    content: '# Welcome',
  },
];

export default function App() {
  return (
    <DynamicArtifactViewer
      artifacts={artifacts}
      defaultArtifactId="1"
      onArtifactChange={(artifact) => {
        console.log('Switched to:', artifact.name);
      }}
    />
  );
}`}</pre>
        </section>
      </main>

      <footer className="demo-footer">
        <p>
          Built with React + TypeScript | Visit{' '}
          <a href="https://github.com/WRZack/artifact-viewer" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
