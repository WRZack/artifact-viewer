import React, { useState } from 'react';
import { DynamicArtifactViewer, Artifact } from '../src/index';
import './App.css';
import { mockArtifacts } from './mockData';

type DemoType = 'basic' | 'agent-output' | 'documentation' | 'design-system' | 'report-generator' | 'code-review' | 'viewers-demo' | 'multi-format';

const App = () => {
  const [currentDemo, setCurrentDemo] = useState<DemoType>('basic');

  const getDemoContent = (): { artifacts: Artifact[]; title: string; description: string } => {
    switch (currentDemo) {
      case 'agent-output':
        return {
          artifacts: mockArtifacts.agentOutput,
          title: '🤖 AI Agent Output',
          description:
            'Displays mixed output from an AI agent including HTML components, markdown documentation, generated code, and analysis results.',
        };
      case 'documentation':
        return {
          artifacts: mockArtifacts.documentation,
          title: '📚 Documentation Hub',
          description:
            'Complete project documentation with README, API docs, code examples, and configuration files all in one place.',
        };
      case 'design-system':
        return {
          artifacts: mockArtifacts.designSystem,
          title: '🎨 Design System',
          description:
            'Design system documentation with interactive components, guidelines, code snippets, and visual examples.',
        };
      case 'report-generator':
        return {
          artifacts: mockArtifacts.reportGenerator,
          title: '📊 Report Generator',
          description:
            'Multi-format reports combining HTML dashboards, markdown analysis, JSON data exports, and visual summaries.',
        };
      case 'code-review':
        return {
          artifacts: mockArtifacts.codeReview,
          title: '👁️ Code Review Tools',
          description:
            'Code review interface showing diffs, comments, suggestions, and multiple file formats in a single view.',
        };
      case 'viewers-demo':
        return {
          artifacts: mockArtifacts.viewersDemo,
          title: '📄 Document & Image Viewers',
          description:
            'Demonstration of PDF, Word document, and image viewers with zoom controls and navigation. All viewers are fully local - no external dependencies.',
        };
      case 'multi-format':
        return {
          artifacts: mockArtifacts.multiFormat,
          title: '📋 Multi-Format Showcase',
          description:
            'Comprehensive demonstration of PDF, Image, HTML, Markdown formats all together in one viewer.',
        };
      case 'basic':
      default:
        return {
          artifacts: mockArtifacts.basic,
          title: '⭐ Basic Example',
          description: 'Simple demonstration with all supported artifact types including PDF, Image, and standard formats.',
        };
    }
  };

  const { artifacts, title, description } = getDemoContent();

  return (
    <div className="demo-app">
      <header className="demo-header">
        <div className="header-content">
          <h1>🎨 Artifact Viewer - Use Cases</h1>
          <p>Explore various real-world scenarios and integrations</p>
        </div>
      </header>

      <nav className="demo-nav">
        <div className="nav-container">
          <button
            className={`nav-btn ${currentDemo === 'basic' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('basic')}
          >
            ⭐ Basic
          </button>
          <button
            className={`nav-btn ${currentDemo === 'agent-output' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('agent-output')}
          >
            🤖 AI Agent
          </button>
          <button
            className={`nav-btn ${currentDemo === 'documentation' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('documentation')}
          >
            📚 Docs
          </button>
          <button
            className={`nav-btn ${currentDemo === 'design-system' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('design-system')}
          >
            🎨 Design
          </button>
          <button
            className={`nav-btn ${currentDemo === 'report-generator' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('report-generator')}
          >
            📊 Reports
          </button>
          <button
            className={`nav-btn ${currentDemo === 'code-review' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('code-review')}
          >
            👁️ Code Review
          </button>
          <button
            className={`nav-btn ${currentDemo === 'multi-format' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('multi-format')}
          >
             Multi-Format
          </button>
          <button
            className={`nav-btn ${currentDemo === 'viewers-demo' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('viewers-demo')}
          >
            📄 Viewers
          </button>
          <button
            className={`nav-btn ${currentDemo === 'viewers-demo' ? 'active' : ''}`}
            onClick={() => setCurrentDemo('viewers-demo')}
          >
            📄 Viewers
          </button>
        </div>
      </nav>

      <main className="demo-main">
        <section className="demo-intro">
          <h2>{title}</h2>
          <p>{description}</p>
        </section>

        <section className="demo-viewer-section">
          <div className="viewer-container">
            <DynamicArtifactViewer
              artifacts={artifacts}
              defaultArtifactId={artifacts[0]?.id}
              onArtifactChange={(artifact) => {
                console.log('Viewing:', artifact.name, `(${artifact.type})`);
              }}
            />
          </div>
        </section>

        {currentDemo === 'basic' && <BasicExampleInfo />}
        {currentDemo === 'agent-output' && <AgentOutputInfo />}
        {currentDemo === 'documentation' && <DocumentationInfo />}
        {currentDemo === 'design-system' && <DesignSystemInfo />}
        {currentDemo === 'report-generator' && <ReportGeneratorInfo />}
        {currentDemo === 'code-review' && <CodeReviewInfo />}
        {currentDemo === 'viewers-demo' && <ViewersDemoInfo />}
        {currentDemo === 'multi-format' && <MultiFormatInfo />}
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

const BasicExampleInfo = () => (
  <section className="demo-section">
    <h3>📝 Overview</h3>
    <p>
      This basic example showcases all supported artifact types in a single viewer. Each artifact type is
      automatically detected and rendered with the appropriate component.
    </p>
    <div className="info-grid">
      <div className="info-card">
        <h4>🌐 HTML</h4>
        <p>Interactive web components rendered in a sandboxed iframe</p>
      </div>
      <div className="info-card">
        <h4>📝 Markdown</h4>
        <p>Beautiful GitHub-flavored markdown with full formatting</p>
      </div>
      <div className="info-card">
        <h4>💻 Code</h4>
        <p>Syntax-highlighted code with multiple language support</p>
      </div>
      <div className="info-card">
        <h4>📊 JSON</h4>
        <p>Structured data with syntax highlighting</p>
      </div>
      <div className="info-card">
        <h4>📄 PDF</h4>
        <p>PDF documents with page navigation</p>
      </div>
      <div className="info-card">
        <h4>🖼️ Image</h4>
        <p>Images with zoom and pan capabilities</p>
      </div>
    </div>
  </section>
);

const AgentOutputInfo = () => (
  <section className="demo-section">
    <h3>🤖 AI Agent Integration</h3>
    <p>
      Perfect for displaying AI-generated content in multiple formats. An agent can produce HTML UI components,
      markdown explanations, code implementations, and JSON-formatted analysis—all displayed seamlessly.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>✨ Multi-Modal Output</h4>
        <p>Agents generate UI (HTML) + explanations (MD) + code + data (JSON) together</p>
      </div>
      <div className="use-case-item">
        <h4>🔄 Sequential Processing</h4>
        <p>Each agent step produces different artifact types for progressive refinement</p>
      </div>
      <div className="use-case-item">
        <h4>📦 Self-Contained</h4>
        <p>All outputs packaged together with automatic format detection</p>
      </div>
    </div>
  </section>
);

const DocumentationInfo = () => (
  <section className="demo-section">
    <h3>📚 Documentation Hub</h3>
    <p>
      Centralize all project documentation. Users can easily navigate between README files, API documentation,
      code examples, and configuration files without switching tools.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>📖 Unified Access</h4>
        <p>README, guides, API docs, examples all in one interface</p>
      </div>
      <div className="use-case-item">
        <h4>🔗 Cross-References</h4>
        <p>Easy navigation between related documentation sections</p>
      </div>
      <div className="use-case-item">
        <h4>💡 Code Examples</h4>
        <p>Integrated code snippets with syntax highlighting</p>
      </div>
    </div>
  </section>
);

const DesignSystemInfo = () => (
  <section className="demo-section">
    <h3>🎨 Design System Documentation</h3>
    <p>
      Display design components, guidelines, code snippets, and visual examples. Designers and developers can
      reference specifications, component implementations, and usage patterns in one place.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>🖌️ Component Library</h4>
        <p>Interactive preview of design components with HTML rendering</p>
      </div>
      <div className="use-case-item">
        <h4>📋 Guidelines</h4>
        <p>Design guidelines, color palettes, and typography specs in markdown</p>
      </div>
      <div className="use-case-item">
        <h4>💻 Implementation</h4>
        <p>React, Vue, Angular code examples with syntax highlighting</p>
      </div>
    </div>
  </section>
);

const ReportGeneratorInfo = () => (
  <section className="demo-section">
    <h3>📊 Report Generation</h3>
    <p>
      Create comprehensive reports combining visualizations, analysis, and data exports. Perfect for business
      intelligence, analytics dashboards, and automated reporting systems.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>📈 Dashboards</h4>
        <p>Interactive HTML dashboards with charts and metrics</p>
      </div>
      <div className="use-case-item">
        <h4>📝 Analysis</h4>
        <p>Written analysis and insights in formatted markdown</p>
      </div>
      <div className="use-case-item">
        <h4>💾 Data Export</h4>
        <p>Raw data in JSON format for further processing</p>
      </div>
    </div>
  </section>
);

const CodeReviewInfo = () => (
  <section className="demo-section">
    <h3>👁️ Code Review Interface</h3>
    <p>
      Streamline code reviews by displaying diffs, suggestions, multiple file versions, and review comments
      in an organized, easy-to-navigate interface.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>📄 Multiple Files</h4>
        <p>Review multiple files side-by-side with tab navigation</p>
      </div>
      <div className="use-case-item">
        <h4>💬 Annotations</h4>
        <p>Comments and suggestions stored as markdown artifacts</p>
      </div>
      <div className="use-case-item">
        <h4>✅ Context</h4>
        <p>Test results, linting output, and CI/CD logs in JSON format</p>
      </div>
    </div>
  </section>
);

const ViewersDemoInfo = () => (
  <section className="demo-section">
    <h3>📄 Document & Image Viewers</h3>
    <p>
      Fully local document and image viewing capabilities. No external services or CDN dependencies - all
      rendering happens entirely in your browser for maximum privacy and reliability.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>📑 PDF Viewer</h4>
        <p>Canvas-based rendering with page navigation and zoom controls. Uses pdf.js for local rendering.</p>
      </div>
      <div className="use-case-item">
        <h4>📋 Word Viewer</h4>
        <p>Converts .docx files to HTML locally using mammoth.js. No Microsoft Office Online dependency.</p>
      </div>
      <div className="use-case-item">
        <h4>🖼️ Image Viewer</h4>
        <p>Supports various image formats with zoom and reset controls. Fully local rendering.</p>
      </div>
    </div>
    <div className="info-grid" style={{ marginTop: '20px' }}>
      <div className="info-card">
        <h4>🔒 Privacy First</h4>
        <p>No documents are sent to external servers</p>
      </div>
      <div className="info-card">
        <h4>⚡ Fast Rendering</h4>
        <p>All processing happens locally in browser</p>
      </div>
      <div className="info-card">
        <h4>🌐 Offline Ready</h4>
        <p>Works without internet connection</p>
      </div>
      <div className="info-card">
        <h4>📦 Zero Dependencies</h4>
        <p>No external API calls or CDN required</p>
      </div>
    </div>
  </section>
);

const MultiFormatInfo = () => (
  <section className="demo-section">
    <h3>📋 Multi-Format Showcase</h3>
    <p>
      This comprehensive showcase demonstrates all the supported file formats working together:
      PDF documents, images, HTML components, Markdown documentation, and more.
    </p>
    <div className="use-case-list">
      <div className="use-case-item">
        <h4>📄 PDF Support</h4>
        <p>View PDF documents with page navigation and full controls</p>
      </div>
      <div className="use-case-item">
        <h4>🖼️ Image Gallery</h4>
        <p>Images with zoom, pan, and rotation capabilities</p>
      </div>
      <div className="use-case-item">
        <h4>🔄 Seamless Switching</h4>
        <p>Switch between any format with instant rendering and proper UI</p>
      </div>
      <div className="use-case-item">
        <h4>✨ Complete Integration</h4>
        <p>All formats work together with a unified, intuitive interface</p>
      </div>
    </div>
  </section>
);

export default App;
