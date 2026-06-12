import { Artifact } from '../src/types';

export const mockArtifacts = {
  basic: [
    {
      id: 'html-demo',
      name: 'Interactive Component',
      type: 'html' as const,
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
            <p>This is a sandboxed HTML preview with full CSS and JavaScript support!</p>
            <button class="button">Get Started</button>
            <div class="features">
              <div class="feature"><div class="feature-icon">✓</div><span>Fully isolated & safe</span></div>
              <div class="feature"><div class="feature-icon">✓</div><span>Interactive components</span></div>
              <div class="feature"><div class="feature-icon">✓</div><span>Custom styling</span></div>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: 'md-demo',
      name: 'Documentation',
      type: 'markdown' as const,
      content: `# Artifact Viewer

## Overview

A powerful React + TypeScript library for displaying various artifact types.

## Supported Formats

- 🌐 **HTML** - Sandboxed rendering
- 📝 **Markdown** - GitHub flavored
- 💻 **Code** - With syntax highlighting
- 📊 **JSON** - Formatted data
- 📄 **PDF** - Document viewing
- 📋 **Word** - Office documents
- 🖼️ **Images** - With zoom controls

## Features

✨ Multi-format support
✨ Zero external dependencies
✨ TypeScript support
✨ Fully responsive
✨ Customizable styling
      `,
    },
    {
      id: 'code-demo',
      name: 'React Example',
      type: 'code' as const,
      language: 'typescript',
      content: `import { DynamicArtifactViewer, Artifact } from 'artifact-viewer';

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
}`,
    },
    {
      id: 'json-demo',
      name: 'Config',
      type: 'json' as const,
      content: JSON.stringify(
        {
          name: 'artifact-viewer',
          version: '0.1.0',
          features: ['HTML', 'Markdown', 'PDF', 'Code', 'Images', 'JSON'],
          stats: {
            components: 8,
            formats: 7,
            dependencies: 4,
          },
        },
        null,
        2
      ),
    },
    {
      id: 'pdf-demo',
      name: 'Sample PDF',
      type: 'pdf' as const,
      content: new Uint8Array([
        0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a, 0x31,
        0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x20, 0x2f,
        0x43, 0x61, 0x74, 0x61, 0x6c, 0x6f, 0x67, 0x0a, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x73, 0x20, 0x32,
        0x20, 0x30, 0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x32, 0x20,
        0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x50,
        0x61, 0x67, 0x65, 0x73, 0x0a, 0x2f, 0x4b, 0x69, 0x64, 0x73, 0x20, 0x5b, 0x33, 0x20, 0x30, 0x20,
        0x52, 0x5d, 0x0a, 0x2f, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x20, 0x31, 0x3e, 0x3e, 0x0a, 0x65, 0x6e,
        0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x33, 0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f,
        0x54, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x0a, 0x2f, 0x50, 0x61, 0x72, 0x65,
        0x6e, 0x74, 0x20, 0x32, 0x20, 0x30, 0x20, 0x52, 0x0a, 0x2f, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72,
        0x63, 0x65, 0x73, 0x20, 0x3c, 0x3c, 0x2f, 0x46, 0x6f, 0x6e, 0x74, 0x20, 0x3c, 0x3c, 0x2f, 0x46,
        0x31, 0x20, 0x34, 0x20, 0x30, 0x20, 0x52, 0x3e, 0x3e, 0x3e, 0x3e, 0x0a, 0x2f, 0x4d, 0x65, 0x64,
        0x69, 0x61, 0x42, 0x6f, 0x78, 0x20, 0x5b, 0x30, 0x20, 0x30, 0x20, 0x36, 0x31, 0x32, 0x20, 0x37,
        0x39, 0x32, 0x5d, 0x0a, 0x2f, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x73, 0x20, 0x35, 0x20,
        0x30, 0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x34, 0x20, 0x30,
        0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x46, 0x6f,
        0x6e, 0x74, 0x0a, 0x2f, 0x53, 0x75, 0x62, 0x74, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x54, 0x79, 0x70,
        0x65, 0x31, 0x0a, 0x2f, 0x42, 0x61, 0x73, 0x65, 0x46, 0x6f, 0x6e, 0x74, 0x20, 0x2f, 0x48, 0x65,
        0x6c, 0x76, 0x65, 0x74, 0x69, 0x63, 0x61, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a,
        0x0a, 0x35, 0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x4c, 0x65, 0x6e, 0x67,
        0x74, 0x68, 0x20, 0x34, 0x34, 0x0a, 0x3e, 0x3e, 0x0a, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x0a,
        0x42, 0x54, 0x0a, 0x2f, 0x46, 0x31, 0x20, 0x31, 0x32, 0x20, 0x54, 0x66, 0x0a, 0x31, 0x30, 0x30,
        0x20, 0x37, 0x30, 0x30, 0x20, 0x54, 0x64, 0x0a, 0x28, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x50,
        0x44, 0x46, 0x21, 0x29, 0x20, 0x54, 0x6a, 0x0a, 0x45, 0x54, 0x0a, 0x65, 0x6e, 0x64, 0x73, 0x74,
        0x72, 0x65, 0x61, 0x6d, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x78, 0x72, 0x65, 0x66,
        0x0a, 0x30, 0x20, 0x36, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x36,
        0x35, 0x35, 0x33, 0x35, 0x20, 0x66, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x39, 0x20,
        0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x37, 0x34,
        0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x31, 0x37,
        0x39, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x33,
        0x39, 0x34, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30,
        0x36, 0x31, 0x38, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x74, 0x72, 0x61,
        0x69, 0x6c, 0x65, 0x72, 0x0a, 0x3c, 0x3c, 0x2f, 0x53, 0x69, 0x7a, 0x65, 0x20, 0x36, 0x0a, 0x2f,
        0x52, 0x6f, 0x6f, 0x74, 0x20, 0x31, 0x20, 0x30, 0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x73, 0x74, 0x61,
        0x72, 0x74, 0x78, 0x72, 0x65, 0x66, 0x0a, 0x36, 0x39, 0x30, 0x0a, 0x25, 0x45, 0x4f, 0x46, 0x0a,
      ]).buffer as ArrayBuffer,
    },
    {
      id: 'image-demo',
      name: 'Sample Image',
      type: 'image' as const,
      content:
        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23667eea%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23764ba2%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22400%22 height=%22300%22 fill=%22url(%23grad)%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3ESample Image%3C/text%3E%3C/svg%3E',
    },
  ] as Artifact[],

  agentOutput: [
    {
      id: 'agent-ui',
      name: 'Generated UI',
      type: 'html' as const,
      content: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header h1 { color: #333; margin-bottom: 8px; }
            .header p { color: #666; font-size: 14px; }
            .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
            .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .card h3 { color: #333; margin-bottom: 8px; }
            .card p { color: #666; font-size: 14px; }
            .metric { font-size: 24px; font-weight: bold; color: #667eea; margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 AI-Generated Dashboard</h1>
              <p>This UI was automatically generated by an AI agent</p>
            </div>
            <div class="cards">
              <div class="card">
                <h3>Total Artifacts</h3>
                <div class="metric">1,234</div>
                <p>+12% from last month</p>
              </div>
              <div class="card">
                <h3>Active Users</h3>
                <div class="metric">5,678</div>
                <p>+8% from last month</p>
              </div>
              <div class="card">
                <h3>Processing Time</h3>
                <div class="metric">1.2s</div>
                <p>-20% improvement</p>
              </div>
              <div class="card">
                <h3>Success Rate</h3>
                <div class="metric">99.8%</div>
                <p>Industry leading</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: 'agent-analysis',
      name: 'AI Analysis',
      type: 'markdown' as const,
      content: `# AI Agent Analysis Report

## Execution Summary

The AI agent completed the task with the following results:

### Performance Metrics

- **Execution Time**: 2.34 seconds
- **Tasks Completed**: 12/12 (100%)
- **Errors**: 0
- **Warnings**: 2

### Generated Artifacts

1. Interactive Dashboard (HTML)
2. Configuration Files (JSON)
3. Documentation (Markdown)
4. Implementation Code (TypeScript)

### Key Findings

> The AI successfully generated all requested artifacts with high quality.
> All components follow best practices and are production-ready.

### Recommendations

1. Review the generated code for team standards compliance
2. Run additional security scanning on HTML components
3. Test on multiple browsers before deployment
      `,
    },
    {
      id: 'agent-code',
      name: 'Generated Code',
      type: 'code' as const,
      language: 'typescript',
      content: `// Auto-generated by AI Agent
import React from 'react';

interface DashboardProps {
  title: string;
  data: Record<string, number>;
}

export const Dashboard: React.FC<DashboardProps> = ({ title, data }) => {
  return (
    <div className="dashboard">
      <h1>{title}</h1>
      <div className="metrics">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="metric-card">
            <h3>{key}</h3>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;`,
    },
    {
      id: 'agent-data',
      name: 'Extracted Data',
      type: 'json' as const,
      content: JSON.stringify(
        {
          execution: {
            startTime: '2024-06-12T10:30:00Z',
            endTime: '2024-06-12T10:32:34Z',
            duration: 2.34,
            status: 'success',
          },
          artifacts: [
            { type: 'html', count: 3, size: '45KB' },
            { type: 'code', count: 5, size: '120KB' },
            { type: 'markdown', count: 2, size: '15KB' },
            { type: 'json', count: 4, size: '85KB' },
          ],
          quality: {
            codeQuality: 0.95,
            documentation: 0.92,
            testing: 0.88,
            security: 0.97,
          },
        },
        null,
        2
      ),
    },
  ] as Artifact[],

  documentation: [
    {
      id: 'docs-readme',
      name: 'README.md',
      type: 'markdown' as const,
      content: `# Project Documentation

## Getting Started

### Installation
\`\`\`bash
npm install artifact-viewer
\`\`\`

### Quick Start
\`\`\`javascript
import { DynamicArtifactViewer } from 'artifact-viewer';
\`\`\`

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Reference](#api-reference)
4. [Examples](#examples)
5. [Contributing](#contributing)

## API Reference

See the API documentation for complete details on all components and their props.
      `,
    },
    {
      id: 'docs-api',
      name: 'API Docs',
      type: 'markdown' as const,
      content: `# API Reference

## DynamicArtifactViewer

### Props

\`\`\`typescript
interface DynamicArtifactViewerProps {
  artifacts: Artifact[] | Artifact;
  defaultArtifactId?: string;
  onArtifactChange?: (artifact: Artifact) => void;
  className?: string;
  style?: React.CSSProperties;
}
\`\`\`

### Example

\`\`\`jsx
<DynamicArtifactViewer
  artifacts={artifacts}
  defaultArtifactId="1"
  onArtifactChange={(artifact) => console.log(artifact)}
/>
\`\`\`

## Artifact Type

\`\`\`typescript
type ArtifactType = 'html' | 'markdown' | 'pdf' | 'docx' | 'code' | 'image' | 'json';
\`\`\`
      `,
    },
    {
      id: 'docs-examples',
      name: 'Code Examples',
      type: 'code' as const,
      language: 'typescript',
      content: `// Example 1: Basic Usage
import { DynamicArtifactViewer, Artifact } from 'artifact-viewer';

const artifacts: Artifact[] = [
  { id: '1', name: 'UI', type: 'html', content: '<h1>Hello</h1>' },
  { id: '2', name: 'Docs', type: 'markdown', content: '# Guide' },
];

function App() {
  return <DynamicArtifactViewer artifacts={artifacts} />;
}

// Example 2: With Callbacks
function AppWithCallbacks() {
  return (
    <DynamicArtifactViewer
      artifacts={artifacts}
      defaultArtifactId="1"
      onArtifactChange={(artifact) => {
        console.log('Viewing:', artifact.name);
      }}
    />
  );
}`,
    },
    {
      id: 'docs-config',
      name: 'Configuration',
      type: 'json' as const,
      content: JSON.stringify(
        {
          project: {
            name: 'artifact-viewer',
            description: 'Multi-format artifact viewer',
            version: '0.1.0',
          },
          features: {
            html: true,
            markdown: true,
            pdf: true,
            code: true,
            images: true,
            json: true,
          },
          build: {
            target: 'ES2020',
            module: 'ESNext',
            format: ['es', 'cjs'],
          },
        },
        null,
        2
      ),
    },
  ] as Artifact[],

  designSystem: [
    {
      id: 'design-preview',
      name: 'Component Preview',
      type: 'html' as const,
      content: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, sans-serif; padding: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; }
            .section { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
            h1 { color: #333; margin-bottom: 20px; }
            h2 { color: #666; margin: 20px 0 10px; font-size: 16px; }
            .button-group { display: flex; gap: 10px; flex-wrap: wrap; margin: 20px 0; }
            .btn { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; }
            .btn-primary { background: #667eea; color: white; }
            .btn-secondary { background: #e0e0e0; color: #333; }
            .btn-danger { background: #f56565; color: white; }
            .color-palette { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
            .color-box { height: 80px; border-radius: 4px; display: flex; align-items: flex-end; justify-content: center; color: white; font-size: 12px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="section">
              <h1>🎨 Design System Components</h1>
              <h2>Buttons</h2>
              <div class="button-group">
                <button class="btn btn-primary">Primary</button>
                <button class="btn btn-secondary">Secondary</button>
                <button class="btn btn-danger">Danger</button>
              </div>
              <h2>Color Palette</h2>
              <div class="color-palette">
                <div class="color-box" style="background: #667eea;">Primary</div>
                <div class="color-box" style="background: #764ba2;">Purple</div>
                <div class="color-box" style="background: #f6ad55;">Orange</div>
                <div class="color-box" style="background: #4facfe;">Blue</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: 'design-guidelines',
      name: 'Design Guidelines',
      type: 'markdown' as const,
      content: `# Design System Guidelines

## Colors

### Primary Colors
- **Primary Blue**: #667eea
- **Primary Purple**: #764ba2

### Secondary Colors
- **Orange**: #f6ad55
- **Light Blue**: #4facfe

## Typography

### Font Family
- Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI'
- Code: 'Fira Code', 'Courier New', monospace

### Font Sizes
- H1: 32px
- H2: 24px
- H3: 18px
- Body: 16px
- Small: 14px

## Spacing

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
      `,
    },
    {
      id: 'design-code',
      name: 'Component Code',
      type: 'code' as const,
      language: 'typescript',
      content: `// Button Component
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-200 text-gray-900',
  danger: 'bg-red-600 text-white',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
}) => {
  return (
    <button className={\`px-4 py-2 rounded \${variantStyles[variant]}\`} onClick={onClick}>
      {children}
    </button>
  );
};`,
    },
    {
      id: 'design-tokens',
      name: 'Design Tokens',
      type: 'json' as const,
      content: JSON.stringify(
        {
          colors: {
            primary: '#667eea',
            secondary: '#764ba2',
            success: '#48bb78',
            warning: '#f6ad55',
            danger: '#f56565',
          },
          typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI',
            sizes: {
              xs: '12px',
              sm: '14px',
              md: '16px',
              lg: '20px',
              xl: '24px',
            },
          },
          spacing: [0, 4, 8, 16, 24, 32, 48, 64],
        },
        null,
        2
      ),
    },
  ] as Artifact[],

  reportGenerator: [
    {
      id: 'report-dashboard',
      name: 'Executive Dashboard',
      type: 'html' as const,
      content: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, sans-serif; background: #f0f2f5; padding: 20px; }
            .dashboard { max-width: 1000px; margin: 0 auto; }
            .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea; }
            .header h1 { color: #333; margin-bottom: 8px; }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px; }
            .kpi { background: white; padding: 20px; border-radius: 8px; text-align: center; }
            .kpi-value { font-size: 32px; font-weight: bold; color: #667eea; }
            .kpi-label { color: #666; font-size: 12px; margin-top: 8px; }
            .chart { background: white; padding: 20px; border-radius: 8px; height: 250px; display: flex; align-items: center; justify-content: center; color: #999; }
          </style>
        </head>
        <body>
          <div class="dashboard">
            <div class="header">
              <h1>📊 Q2 2024 Executive Report</h1>
              <p>Performance overview and key metrics</p>
            </div>
            <div class="grid">
              <div class="kpi">
                <div class="kpi-value">$2.3M</div>
                <div class="kpi-label">Total Revenue</div>
              </div>
              <div class="kpi">
                <div class="kpi-value">+24%</div>
                <div class="kpi-label">Growth YoY</div>
              </div>
              <div class="kpi">
                <div class="kpi-value">1.2K</div>
                <div class="kpi-label">Active Customers</div>
              </div>
              <div class="kpi">
                <div class="kpi-value">92%</div>
                <div class="kpi-label">Retention Rate</div>
              </div>
            </div>
            <div class="chart">Interactive Chart Goes Here</div>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: 'report-analysis',
      name: 'Detailed Analysis',
      type: 'markdown' as const,
      content: `# Q2 2024 Financial Analysis

## Executive Summary

Q2 2024 showed strong growth across all business lines with revenue reaching $2.3M, a 24% increase year-over-year.

## Key Metrics

### Revenue
- **Total Revenue**: $2.3M
- **Net Income**: $480K
- **Profit Margin**: 20.9%

### Customer Metrics
- **Active Customers**: 1,200
- **New Customers**: 340 (28% of total)
- **Retention Rate**: 92%
- **Churn Rate**: 8%

### Performance Analysis

| Metric | Q1 | Q2 | Change |
|--------|----|----|--------|
| Revenue | $1.85M | $2.3M | +24% |
| Customers | 890 | 1,200 | +34% |
| Avg Deal Size | $2,100 | $1,900 | -10% |

## Recommendations

1. Scale marketing spend to capitalize on growth momentum
2. Invest in customer success infrastructure
3. Develop premium tier to increase average deal size
      `,
    },
    {
      id: 'report-data',
      name: 'Raw Data Export',
      type: 'json' as const,
      content: JSON.stringify(
        {
          report: {
            period: 'Q2 2024',
            generatedAt: '2024-06-30T23:59:59Z',
          },
          financials: {
            revenue: 2300000,
            netIncome: 480000,
            profitMargin: 0.209,
            expenses: {
              operations: 920000,
              marketing: 580000,
              engineering: 320000,
            },
          },
          customers: {
            total: 1200,
            new: 340,
            churned: 96,
            retention: 0.92,
            avgDealSize: 1900,
          },
          growth: {
            qoqRevenue: 0.243,
            yoyRevenue: 0.243,
            customerGrowth: 0.34,
          },
        },
        null,
        2
      ),
    },
  ] as Artifact[],

  codeReview: [
    {
      id: 'review-file1',
      name: 'UserAuth.tsx',
      type: 'code' as const,
      language: 'typescript',
      content: `// ✅ REVIEWED
import React, { useState } from 'react';
import { useAuth } from './hooks';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Add input validation
    const result = await login(email, password);
    
    if (result.success) {
      setError(null);
      onSuccess?.();
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};`,
    },
    {
      id: 'review-file2',
      name: 'api.test.ts',
      type: 'code' as const,
      language: 'typescript',
      content: `// ❌ NEEDS WORK
import { describe, it, expect } from 'vitest';
import { fetchUser } from './api';

describe('API', () => {
  // Missing setup/teardown
  
  it('should fetch user', async () => {
    const user = await fetchUser(1);
    expect(user).toBeDefined();
  });
  
  // Missing error cases
  // Missing edge cases
  // Missing mock setup
});

// REVIEW COMMENTS:
// 1. Add beforeEach for mock server setup
// 2. Test error handling
// 3. Add test for network timeout
// 4. Mock external API calls`,
    },
    {
      id: 'review-suggestions',
      name: 'Review Comments',
      type: 'markdown' as const,
      content: `# Code Review - Pull Request #42

## Summary
Changes look good overall. Some improvements needed in tests and validation.

## Files Changed
- ✅ UserAuth.tsx - Approved with minor suggestions
- ⚠️ api.test.ts - Needs revision
- ✅ types.ts - Approved

## Detailed Comments

### UserAuth.tsx
**Line 15**: Add input validation before submission
\`\`\`suggestion
if (!email || !password) {
  setError('Email and password are required');
  return;
}
\`\`\`

### api.test.ts
**Issues**:
1. Tests need mock server setup (MSW)
2. Missing error case tests
3. No timeout test

**Required Changes**:
- [ ] Add beforeEach setup
- [ ] Add error handling tests
- [ ] Add network error simulation
- [ ] Increase test coverage to >80%

## Overall Assessment

- Code Quality: 8/10
- Test Coverage: 6/10
- Documentation: 7/10

**Status**: Request changes before merge
      `,
    },
    {
      id: 'review-metrics',
      name: 'Review Metrics',
      type: 'json' as const,
      content: JSON.stringify(
        {
          pullRequest: {
            number: 42,
            author: 'developer@example.com',
            created: '2024-06-12T10:00:00Z',
            updated: '2024-06-12T15:30:00Z',
          },
          changes: {
            filesChanged: 3,
            additions: 245,
            deletions: 42,
            netChange: 203,
          },
          quality: {
            codeQuality: 0.8,
            testCoverage: 0.6,
            documentation: 0.7,
            security: 0.85,
          },
          review: {
            comments: 5,
            suggestedChanges: 3,
            approved: false,
            status: 'changes_requested',
          },
        },
        null,
        2
      ),
    },
  ] as Artifact[],

  multiFormat: [
    {
      id: 'multi-pdf',
      name: 'PDF Document',
      type: 'pdf' as const,
      content: new Uint8Array([
        0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a, 0x31,
        0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x20, 0x2f,
        0x43, 0x61, 0x74, 0x61, 0x6c, 0x6f, 0x67, 0x0a, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x73, 0x20, 0x32,
        0x20, 0x30, 0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x32, 0x20,
        0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x50,
        0x61, 0x67, 0x65, 0x73, 0x0a, 0x2f, 0x4b, 0x69, 0x64, 0x73, 0x20, 0x5b, 0x33, 0x20, 0x30, 0x20,
        0x52, 0x5d, 0x0a, 0x2f, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x20, 0x31, 0x3e, 0x3e, 0x0a, 0x65, 0x6e,
        0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x33, 0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f,
        0x54, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x0a, 0x2f, 0x50, 0x61, 0x72, 0x65,
        0x6e, 0x74, 0x20, 0x32, 0x20, 0x30, 0x20, 0x52, 0x0a, 0x2f, 0x52, 0x65, 0x73, 0x6f, 0x75, 0x72,
        0x63, 0x65, 0x73, 0x20, 0x3c, 0x3c, 0x2f, 0x46, 0x6f, 0x6e, 0x74, 0x20, 0x3c, 0x3c, 0x2f, 0x46,
        0x31, 0x20, 0x34, 0x20, 0x30, 0x20, 0x52, 0x3e, 0x3e, 0x3e, 0x3e, 0x0a, 0x2f, 0x4d, 0x65, 0x64,
        0x69, 0x61, 0x42, 0x6f, 0x78, 0x20, 0x5b, 0x30, 0x20, 0x30, 0x20, 0x36, 0x31, 0x32, 0x20, 0x37,
        0x39, 0x32, 0x5d, 0x0a, 0x2f, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x6e, 0x74, 0x73, 0x20, 0x35, 0x20,
        0x30, 0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x34, 0x20, 0x30,
        0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x46, 0x6f,
        0x6e, 0x74, 0x0a, 0x2f, 0x53, 0x75, 0x62, 0x74, 0x79, 0x70, 0x65, 0x20, 0x2f, 0x54, 0x79, 0x70,
        0x65, 0x31, 0x0a, 0x2f, 0x42, 0x61, 0x73, 0x65, 0x46, 0x6f, 0x6e, 0x74, 0x20, 0x2f, 0x48, 0x65,
        0x6c, 0x76, 0x65, 0x74, 0x69, 0x63, 0x61, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a,
        0x0a, 0x35, 0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c, 0x3c, 0x2f, 0x4c, 0x65, 0x6e, 0x67,
        0x74, 0x68, 0x20, 0x34, 0x34, 0x0a, 0x3e, 0x3e, 0x0a, 0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x0a,
        0x42, 0x54, 0x0a, 0x2f, 0x46, 0x31, 0x20, 0x31, 0x32, 0x20, 0x54, 0x66, 0x0a, 0x31, 0x30, 0x30,
        0x20, 0x37, 0x30, 0x30, 0x20, 0x54, 0x64, 0x0a, 0x28, 0x50, 0x44, 0x46, 0x20, 0x44, 0x6f, 0x63,
        0x75, 0x6d, 0x65, 0x6e, 0x74, 0x29, 0x20, 0x54, 0x6a, 0x0a, 0x45, 0x54, 0x0a, 0x65, 0x6e, 0x64,
        0x73, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a, 0x78, 0x72,
        0x65, 0x66, 0x0a, 0x30, 0x20, 0x36, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
        0x20, 0x36, 0x35, 0x35, 0x33, 0x35, 0x20, 0x66, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30,
        0x39, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30, 0x30,
        0x37, 0x34, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30, 0x30,
        0x31, 0x37, 0x39, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30, 0x30,
        0x30, 0x33, 0x39, 0x34, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x30, 0x30,
        0x30, 0x30, 0x36, 0x31, 0x38, 0x20, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x6e, 0x20, 0x0a, 0x74,
        0x72, 0x61, 0x69, 0x6c, 0x65, 0x72, 0x0a, 0x3c, 0x3c, 0x2f, 0x53, 0x69, 0x7a, 0x65, 0x20, 0x36,
        0x0a, 0x2f, 0x52, 0x6f, 0x6f, 0x74, 0x20, 0x31, 0x20, 0x30, 0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x73,
        0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66, 0x0a, 0x36, 0x39, 0x30, 0x0a, 0x25, 0x45, 0x4f,
        0x46, 0x0a,
      ]).buffer as ArrayBuffer,
    },
    {
      id: 'multi-image-1',
      name: 'Dashboard Preview',
      type: 'image' as const,
      content:
        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%234facfe%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%2300f2fe%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22400%22 height=%22300%22 fill=%22url(%23grad)%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3E📊 Dashboard%3C/text%3E%3C/svg%3E',
    },
    {
      id: 'multi-image-2',
      name: 'Report Chart',
      type: 'image' as const,
      content:
        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad2%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23f093fb%22/%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23f5576c%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22400%22 height=%22300%22 fill=%22url(%23grad2)%22/%3E%3Ctext x=%22200%22 y=%22150%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3E📈 Chart%3C/text%3E%3C/svg%3E',
    },
    {
      id: 'multi-html',
      name: 'Report HTML',
      type: 'html' as const,
      content: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .report { background: white; padding: 30px; border-radius: 8px; }
            h1 { color: #333; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #667eea; color: white; }
            tr:hover { background: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="report">
            <h1>📊 Q2 2024 Report</h1>
            <p>Performance metrics and analysis</p>
            <table>
              <tr>
                <th>Metric</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Growth</th>
              </tr>
              <tr>
                <td>Revenue</td>
                <td>$1.8M</td>
                <td>$2.3M</td>
                <td>+28%</td>
              </tr>
              <tr>
                <td>Users</td>
                <td>890</td>
                <td>1,200</td>
                <td>+35%</td>
              </tr>
              <tr>
                <td>Satisfaction</td>
                <td>87%</td>
                <td>92%</td>
                <td>+5%</td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    },
    {
      id: 'multi-md',
      name: 'Report Analysis',
      type: 'markdown' as const,
      content: `# Executive Summary

## Q2 2024 Performance

This quarter demonstrated exceptional growth across all key metrics.

### Key Highlights

- **Revenue**: $2.3M (+28% QoQ)
- **Users**: 1,200 (+35% QoQ)
- **Customer Satisfaction**: 92% (+5% from Q1)
- **Retention Rate**: 94% (industry-leading)

### Growth Drivers

1. Expanded market reach
2. Product improvements
3. Enhanced customer support
4. Strategic partnerships

### Looking Forward

We're positioned for continued growth in Q3 with new feature launches and market expansion initiatives.
      `,
    },
  ] as Artifact[],
};
