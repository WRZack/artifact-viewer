# DynamicArtifactViewer 使用手册

> 一个强大的 React + TypeScript 多格式制品查看器，支持 HTML、Markdown、PDF、Word/DOCX、代码、图片和 JSON 格式的统一展示。

---

## 📖 目录

1. [概述](#概述)
2. [安装](#安装)
3. [快速上手](#快速上手)
4. [API 参考](#api-参考)
5. [支持的格式与类型](#支持的格式与类型)
6. [内置查看器详解](#内置查看器详解)
7. [UI 功能](#ui-功能)
8. [使用场景](#使用场景)
9. [样式自定义](#样式自定义)
10. [组件导出](#组件导出)
11. [依赖说明](#依赖说明)
12. [浏览器支持](#浏览器支持)
13. [常见问题](#常见问题)

---

## 概述

`DynamicArtifactViewer` 是一个 React 组件，用于在统一的界面中查看多种格式的制品（Artifact）。它特别适用于 AI Agent 场景——Agent 可以同时生成 HTML 组件、Markdown 文档、代码实现、JSON 数据等多种格式的输出，`DynamicArtifactViewer` 将它们组织在一个带标签页的界面中，用户可以轻松切换查看。

### 核心特性

| 特性 | 说明 |
|------|------|
| 🎯 **多格式支持** | HTML、Markdown、PDF、Word/DOCX、代码、图片、JSON |
| 🔄 **多制品管理** | 标签页导航，支持单制品或制品数组 |
| 🖥️ **全屏模式** | 一键全屏查看，沉浸式体验 |
| ⬇️ **下载功能** | 内置下载支持，自动识别 MIME 类型 |
| 🎨 **类型标签** | 彩色类型徽章，直观区分格式 |
| 📱 **响应式设计** | 完美适配桌面和移动设备 |
| 🔒 **安全沙箱** | HTML 内容在沙箱 iframe 中渲染 |
| 🔒 **本地渲染** | PDF/Word 全部本地渲染，无需外部服务 |

---

## 安装

```bash
# 使用 npm
npm install artifact-viewer

# 使用 yarn
yarn add artifact-viewer

# 使用 pnpm
pnpm add artifact-viewer
```

---

## 快速上手

### 最简示例

```tsx
import React from 'react';
import { DynamicArtifactViewer, Artifact } from 'artifact-viewer';

const artifacts: Artifact[] = [
  {
    id: '1',
    name: '欢迎页面',
    type: 'html',
    content: '<h1>你好，世界！</h1><p>这是一个 HTML 制品</p>',
  },
  {
    id: '2',
    name: '项目文档',
    type: 'markdown',
    content: '# 项目说明\n\n这是一个 **Markdown** 制品。',
  },
  {
    id: '3',
    name: 'app.tsx',
    type: 'code',
    language: 'typescript',
    content: 'import React from "react";\n\nconst App = () => <h1>Hello</h1>;',
  },
];

function App() {
  return (
    <DynamicArtifactViewer
      artifacts={artifacts}
      defaultArtifactId="1"
    />
  );
}

export default App;
```

### 单制品模式

```tsx
// 传入单个 Artifact 对象（非数组）
const singleArtifact: Artifact = {
  id: 'readme',
  name: 'README.md',
  type: 'markdown',
  content: '# Hello\n\nThis is a single artifact.',
};

<DynamicArtifactViewer artifacts={singleArtifact} />
```

### 带事件回调

```tsx
<DynamicArtifactViewer
  artifacts={artifacts}
  defaultArtifactId={artifacts[0].id}
  onArtifactChange={(artifact) => {
    console.log('当前查看:', artifact.name, `(${artifact.type})`);
  }}
/>
```

---

## API 参考

### DynamicArtifactViewer Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `artifacts` | `Artifact[] \| Artifact` | ✅ | — | 要展示的制品，支持单个对象或数组 |
| `defaultArtifactId` | `string` | ❌ | 数组第一项 | 初始显示的制品 ID |
| `onArtifactChange` | `(artifact: Artifact) => void` | ❌ | — | 切换制品时的回调函数 |
| `className` | `string` | ❌ | `''` | 自定义 CSS 类名 |
| `style` | `React.CSSProperties` | ❌ | `{}` | 自定义内联样式 |

### Artifact 接口

```typescript
interface Artifact {
  id: string;                        // 唯一标识符
  name: string;                      // 显示名称
  type: ArtifactType;                // 制品类型
  content?: string | ArrayBuffer;    // 文件内容（文本或二进制）
  url?: string;                      // 远程文件 URL（用于 PDF/Word/图片）
  language?: string;                 // 编程语言（仅 code 类型需要）
  createdAt?: Date;                  // 创建时间
  updatedAt?: Date;                  // 更新时间
  metadata?: Record<string, any>;    // 自定义元数据
}
```

### ArtifactType 类型

```typescript
type ArtifactType = 'html' | 'markdown' | 'pdf' | 'docx' | 'word' | 'code' | 'image' | 'json';
```

> **注意：** `docx` 和 `word` 类型等效，均使用 WordViewer 进行渲染。

---

## 支持的格式与类型

| 类型 | 标签颜色 | 内容方式 | 说明 |
|------|----------|----------|------|
| `html` | 🟠 `#e34c26` | `content: string` | HTML 内容，在沙箱 iframe 中渲染 |
| `markdown` | 🔵 `#083fa1` | `content: string` | GitHub 风格 Markdown 渲染 |
| `pdf` | 🔴 `#d40000` | `content: ArrayBuffer` 或 `url: string` | 基于 pdf.js 的本地 PDF 渲染 |
| `docx` / `word` | 🔵 `#0078d4` | `content: ArrayBuffer` 或 `url: string` | 基于 mammoth.js 的本地 Word 渲染 |
| `code` | 🔵 `#3178c6` | `content: string` + `language?: string` | 基于 highlight.js 的语法高亮代码 |
| `image` | 🟠 `#ffa726` | `content: string`（Base64）或 `url: string` | 带缩放控制的图片查看器 |
| `json` | 🟡 `#fcbe4d` | `content: string \| object` | JSON 数据，以代码高亮方式展示 |

### 各类型颜色映射

```
HTML     → #e34c26 (橙红)
Markdown → #083fa1 (深蓝)
PDF      → #d40000 (红色)
DOCX     → #0078d4 (蓝色)
Word     → #0078d4 (蓝色)
Code     → #3178c6 (青蓝)
Image    → #ffa726 (橙色)
JSON     → #fcbe4d (金黄)
```

---

## 内置查看器详解

### 1. HtmlViewer — HTML 查看器

**特性：**
- 在沙箱 `<iframe>` 中渲染 HTML 内容
- 使用 Blob URL 而非 `srcDoc`，更安全
- 沙箱策略：`allow-scripts allow-popups allow-forms`（禁止 `allow-same-origin`，实现完全隔离）
- Referrer 策略：`no-referrer`
- 支持通过 `url` 直接加载远程页面

**使用示例：**

```tsx
const htmlArtifact: Artifact = {
  id: 'html-1',
  name: '交互组件',
  type: 'html',
  content: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1 { color: #333; }
          button { padding: 8px 16px; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1>交互式组件</h1>
        <button onclick="alert('Hello!')">点击我</button>
      </body>
    </html>
  `,
};
```

---

### 2. MarkdownViewer — Markdown 查看器

**特性：**
- 使用 `marked` 库渲染 GitHub 风格 Markdown (GFM)
- 支持换行（`breaks: true`）
- 支持表格、任务��表、删除线等 GFM 扩展语法
- 渲染结果以 `dangerouslySetInnerHTML` 注入

**使用示例：**

```tsx
const mdArtifact: Artifact = {
  id: 'md-1',
  name: 'API 文档',
  type: 'markdown',
  content: `
# API 文档

## 接口说明

| 方法 | 路径 | 说明 |
|------|------|------|
| GET  | /api/users | 获取用户列表 |
| POST | /api/users | 创建用户 |

\`\`\`typescript
interface User {
  id: number;
  name: string;
}
\`\`\`

- [x] 已完成的功能
- [ ] 待开发的功能
  `,
};
```

---

### 3. PdfViewer — PDF 查看器

**特性：**
- 基于 `pdfjs-dist`（pdf.js）进行纯本地 Canvas 渲染
- **无需外部服务**，隐私安全
- 页面导航：上一页 / 下一页
- 缩放控制：50% ~ 300%，步进 25%
- 支持 `ArrayBuffer`、Base64 Data URL 和远程 URL 三种输入方式
- PDF.js Worker 本地加载，无需 CDN

**使用示例：**

```tsx
// 方式一：ArrayBuffer（如文件上传）
const pdfArtifact: Artifact = {
  id: 'pdf-1',
  name: '报告.pdf',
  type: 'pdf',
  content: pdfArrayBuffer,  // ArrayBuffer
};

// 方式二：远程 URL
const pdfUrlArtifact: Artifact = {
  id: 'pdf-2',
  name: '合同.pdf',
  type: 'pdf',
  url: 'https://example.com/document.pdf',
};

// 方式三：Base64 Data URL
const pdfBase64Artifact: Artifact = {
  id: 'pdf-3',
  name: '发票.pdf',
  type: 'pdf',
  content: 'data:application/pdf;base64,JVBERi0xLjQ...',
};
```

**控件说明：**

| 控件 | 功能 |
|------|------|
| ← Previous | 上一页 |
| Next → | 下一页 |
| − | 缩小（最小 50%） |
| + | 放大（最大 300%） |
| Page X of Y | 页码显示 |

---

### 4. WordViewer — Word/DOCX 查看器

**特性：**
- 基于 `mammoth.js` 将 DOCX 转换为 HTML 本地渲染
- **无需 Microsoft Office Online**，完全离线可用
- 支持标题样式映射（Heading 1/2/3 → h1/h2/h3）
- 支持 `ArrayBuffer`、Base64 Data URL 和远程 URL
- 加载中显示进度提示，错误时显示友好错误信息

**使用示例：**

```tsx
// 方式一：ArrayBuffer
const docxArtifact: Artifact = {
  id: 'docx-1',
  name: '方案书.docx',
  type: 'docx',
  content: docxArrayBuffer,
};

// 方式二：远程 URL
const docxUrlArtifact: Artifact = {
  id: 'docx-2',
  name: '合同.docx',
  type: 'word',  // 'word' 和 'docx' 等效
  url: 'https://example.com/document.docx',
};
```

---

### 5. CodeViewer — 代码查看器

**特性：**
- 基于 `highlight.js` 的语法高亮
- 使用 Atom One Dark 主题
- **自动语言检测**：根据文件扩展名或内容特征自动识别语言
- 支持手动指定 `language` 属性
- 一键复制代码到剪贴板

**支持的语言检测映射：**

| 扩展名 | 语言 |
|--------|------|
| `.js` / `.jsx` | JavaScript |
| `.ts` / `.tsx` | TypeScript |
| `.py` | Python |
| `.java` | Java |
| `.cpp` / `.c` | C/C++ |
| `.go` | Go |
| `.rs` | Rust |
| `.php` | PHP |
| `.rb` | Ruby |
| `.swift` | Swift |
| `.kt` | Kotlin |
| `.sql` | SQL |
| `.html` / `.css` | HTML/CSS |
| `.json` | JSON |
| `.yaml` / `.yml` | YAML |
| `.sh` / `.bash` | Bash |

**使用示例：**

```tsx
const codeArtifact: Artifact = {
  id: 'code-1',
  name: 'utils.ts',
  type: 'code',
  language: 'typescript',  // 可选，不指定则自动检测
  content: `
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
  `,
};
```

**Source/Preview 切换：** 对于 `code` 类型制品，工具栏会显示「📄 Source / 🎨 Preview」切换按钮。

---

### 6. ImageViewer — 图片查看器

**特性：**
- 缩放控制：25% ~ 300%，步进 25%
- 一键重置缩放
- 支持多种图���格式（PNG、JPG、GIF、SVG、WebP 等）
- 支持 URL、Base64 Data URL 和 ArrayBuffer 输入
- 平滑缩放动画（`transition: transform 0.2s`）

**使用示例：**

```tsx
// 方式一：Base64 Data URL
const imageArtifact: Artifact = {
  id: 'img-1',
  name: '截图.png',
  type: 'image',
  content: 'data:image/png;base64,iVBORw0KGgo...',
};

// 方式二：远程 URL
const imageUrlArtifact: Artifact = {
  id: 'img-2',
  name: 'logo.svg',
  type: 'image',
  url: 'https://example.com/logo.svg',
};
```

**控件说明：**

| 控件 | 功能 |
|------|------|
| 🔍− | 缩小（最小 25%） |
| 🔍+ | 放大（最大 300%） |
| Reset | 重置为 100% |

---

### 7. JSON 查看

JSON 类型制品内部使用 `CodeViewer` 渲染，自动设置 `language="json"`：

```tsx
const jsonArtifact: Artifact = {
  id: 'json-1',
  name: '配置文件',
  type: 'json',
  content: JSON.stringify({
    name: "my-project",
    version: "1.0.0",
    dependencies: { react: "^18.2.0" }
  }, null, 2),
};

// 也支持直接传入对象，会自动 JSON.stringify
const jsonArtifact2: Artifact = {
  id: 'json-2',
  name: '分析结果',
  type: 'json',
  content: { count: 42, items: ["a", "b", "c"] } as any,
};
```

---

## UI 功能

### 工具栏

工具栏位于查看器顶部右侧，提供以下功能：

| 按钮 | 图标 | 适用类型 | 说明 |
|------|------|----------|------|
| Source / Preview | 📄 / 🎨 | 仅 `code` | 在源码和预览模式间切换 |
| Fullscreen / Exit Fullscreen | 🖥️ / ⛔ | 所有类型 | 全屏模式开关 |
| Download | ⬇️ | 所有类型 | 下载当前制品 |

### 下载功能 MIME 类型映射

| 类型 | MIME 类型 | 文件扩展名 |
|------|-----------|------------|
| `html` | `text/html` | `.html` |
| `markdown` | `text/markdown` | `.md` |
| `json` | `application/json` | `.json` |
| `pdf` | `application/pdf` | `.pdf` |
| `docx` / `word` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | `.docx` |
| 其他 | `text/plain` | `.txt` |

### 标签页导航

当 `artifacts` 为数组且长度 > 1 时，自动显示标签页导航栏：

- 每个标签显示**类型颜色点**和**制品名称**
- 当前选中标签以类型颜色作为底部边框
- 切换标签时触发 `onArtifactChange` 回调
- 切换标签时自动重置 Source 视图状态

### 类型徽章

标题旁显示当前制品的类型徽章，颜色与标签页颜色点一致，显示大写类型名（如 `HTML`、`MARKDOWN`、`CODE`）。

---

## 使用场景

### 场景一：AI Agent 输出展示

```tsx
// AI Agent 同时生成多种格式的输出
const agentOutputs: Artifact[] = [
  { id: '1', name: 'UI 组件', type: 'html', content: htmlComponent },
  { id: '2', name: '实现说明', type: 'markdown', content: explanation },
  { id: '3', name: '组件代码', type: 'code', language: 'typescript', content: code },
  { id: '4', name: '分析数据', type: 'json', content: analysisData },
];

<DynamicArtifactViewer
  artifacts={agentOutputs}
  onArtifactChange={(a) => trackEvent('agent_output_viewed', a)}
/>
```

### 场景二：文档中心

```tsx
// 项目文档统一展示
const docs: Artifact[] = [
  { id: '1', name: 'README.md', type: 'markdown', content: readme },
  { id: '2', name: 'API 文档', type: 'markdown', content: apiDocs },
  { id: '3', name: '示例代码', type: 'code', language: 'typescript', content: example },
  { id: '4', name: '配置示例', type: 'json', content: config },
];

<DynamicArtifactViewer artifacts={docs} defaultArtifactId="1" />
```

### 场景三：设计系统文档

```tsx
// 设计系统组件 + 规范 + 实现代码
const designSystem: Artifact[] = [
  { id: '1', name: 'Button 组件', type: 'html', content: buttonPreview },
  { id: '2', name: '设计规范', type: 'markdown', content: guidelines },
  { id: '3', name: 'Button.tsx', type: 'code', language: 'typescript', content: implementation },
];
```

### 场景四：报告生成器

```tsx
// 多格式报告
const report: Artifact[] = [
  { id: '1', name: '数据看板', type: 'html', content: dashboardHtml },
  { id: '2', name: '分析报告', type: 'markdown', content: analysis },
  { id: '3', name: '原始数据', type: 'json', content: rawData },
  { id: '4', name: '图表截图', type: 'image', url: chartImageUrl },
];
```

### 场景五：代码审查

```tsx
// 代码审查界面
const codeReview: Artifact[] = [
  { id: '1', name: 'diff.ts', type: 'code', language: 'typescript', content: diffContent },
  { id: '2', name: '审查意见', type: 'markdown', content: reviewComments },
  { id: '3', name: '测试结果', type: 'json', content: testResults },
  { id: '4', name: 'CI 日志', type: 'code', content: ciLogs },
];
```

### 场景六：文档与图片查看

```tsx
// PDF、Word 文档和图片
const documents: Artifact[] = [
  { id: '1', name: '合同.pdf', type: 'pdf', content: pdfArrayBuffer },
  { id: '2', name: '方案书.docx', type: 'docx', content: docxArrayBuffer },
  { id: '3', name: '架构图.png', type: 'image', url: architectureImageUrl },
];
```

---

## 样式自定义

### CSS 类名覆盖

```css
/* 主容器 */
.dynamic-artifact-viewer {
  /* 自定义样式 */
}

/* 全屏模式 */
.dynamic-artifact-viewer.fullscreen {
  /* 自定义全屏样式 */
}

/* 头部区域 */
.viewer-header {
  /* 自定义头部样式 */
}

/* 标题区域 */
.viewer-title h2 {
  /* 自定义标题样式 */
}

/* 类型徽章 */
.type-badge {
  /* 自定义徽章样式 */
}

/* 工具栏 */
.viewer-toolbar {
  /* 自定义工具栏样式 */
}

/* 工具栏按钮 */
.toolbar-btn {
  /* 自定义按钮样式 */
}

/* 标签页容器 */
.viewer-tabs {
  /* 自定义标签页样式 */
}

/* 标签按钮 */
.tab-btn {
  /* 默认标签样式 */
}
.tab-btn.active {
  /* 选中标签样式 */
}

/* 类型颜色点 */
.tab-dot {
  /* 自定义颜色点样式 */
}

/* 内容区域 */
.viewer-content {
  /* 自定义内容区域样式 */
}
```

### 通过 Props 自定义

```tsx
<DynamicArtifactViewer
  artifacts={artifacts}
  className="my-custom-viewer"
  style={{
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  }}
/>
```

### 响应式断点

组件内置移动端适配，在 `768px` 以下自动调整布局：

- 头部改为垂直排列
- 按钮尺寸缩小
- 标签页间距收紧
- 内容区域 padding 缩小
- 最小高度从 `600px` 降为 `400px`

---

## 组件导出

库的入口文件 (`src/index.ts`) 导出以下内容：

```typescript
// 主要组件
export { ArtifactViewer } from './components/ArtifactViewer';
export { ArtifactPreview } from './components/ArtifactPreview';
export { DynamicArtifactViewer } from './components/DynamicArtifactViewer';

// 子查看器
export { CodeViewer } from './components/viewers/CodeViewer';
export { HtmlViewer } from './components/viewers/HtmlViewer';
export { MarkdownViewer } from './components/viewers/MarkdownViewer';
export { PdfViewer } from './components/viewers/PdfViewer';
export { WordViewer } from './components/viewers/WordViewer';
export { ImageViewer } from './components/viewers/ImageViewer';

// 类型
export type { ArtifactViewerProps, Artifact, ArtifactType } from './types';
```

### 单独使用子查看器

你也可以直接使用子查看器组件，无需通过 `DynamicArtifactViewer`：

```tsx
import { CodeViewer, PdfViewer, MarkdownViewer } from 'artifact-viewer';

// 直接使用 Markdown 查看器
<MarkdownViewer
  content="# Hello\n\nWorld"
  artifact={artifact}
/>

// 直接使用 PDF 查看器
<PdfViewer
  url="https://example.com/doc.pdf"
  artifact={artifact}
/>

// 直接使用代码查看器
<CodeViewer
  content="const x = 1;"
  artifact={artifact}
  language="javascript"
/>
```

---

## 依赖说明

### 运行时依赖

| 依赖 | 版本 | 用��� |
|------|------|------|
| `react` | `^18.2.0` | UI 框架 |
| `react-dom` | `^18.2.0` | DOM 渲染 |
| `highlight.js` | `^11.9.0` | 代码语法高亮（CodeViewer） |
| `marked` | `^11.1.1` | Markdown 解析渲染（MarkdownViewer） |
| `pdfjs-dist` | `^4.0.379` | PDF 本地渲染（PdfViewer） |
| `mammoth` | `^1.12.0` | DOCX 转 HTML（WordViewer） |

### 开发依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| `typescript` | `^5.3.3` | 类型检查 |
| `vite` | `^5.0.8` | 构建工具 |
| `@vitejs/plugin-react` | `^4.2.1` | React 支持 |

### 零外部 UI 依赖

本库 **不依赖** 任何外部 UI 组件库（如 Ant Design、Material UI 等），所有 UI 均为原生实现，确保体积最小、无样式冲突。

---

## 浏览器支持

| 浏览器 | 支持状态 |
|--------|----------|
| Chrome（最新版） | ✅ 完全支持 |
| Firefox（最新版） | ✅ 完全支持 |
| Safari（最新版） | ✅ 完全支持 |
| Edge（最新版） | ✅ 完全支持 |

---

## 常见问题

### Q: 如何加载远程 PDF 文件？

使用 `url` 属性：

```tsx
const artifact: Artifact = {
  id: 'pdf-remote',
  name: '远程PDF',
  type: 'pdf',
  url: 'https://example.com/document.pdf',
};
```

> ⚠️ 注意：远程 URL 需要目标服务器支持 CORS，否则加载会失败。

### Q: 如何加载本地文件（如文件上传）？

通过 `FileReader` 读取为 `ArrayBuffer`：

```tsx
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const artifact: Artifact = {
      id: file.name,
      name: file.name,
      type: file.name.endsWith('.pdf') ? 'pdf' : 'docx',
      content: reader.result as ArrayBuffer,
    };
    setArtifacts(prev => [...prev, artifact]);
  };
  reader.readAsArrayBuffer(file);
};
```

### Q: HTML 制品中的脚本会被执行吗？

会执行，但在**沙箱隔离**的 iframe 中运行。沙箱配置为 `allow-scripts allow-popups allow-forms`，**不包含** `allow-same-origin`，这意味着 HTML 内容无法访问宿主页面的 Cookie、LocalStorage 等资源。

### Q: Word 文档中的复杂格式能保留吗？

mammoth.js 以语义转换为主，支持段落、标题、粗体、斜体、列表等常见格式。但以下格式**不支持**：
- 复杂表格布局
- 嵌入图片
- 页眉页脚
- 自定义样式

如需完整的格式保留，建议使用 PDF 格式或将 Word 转为 PDF 后查看。

### Q: 代码高亮支持哪些语言？

highlight.js 默认包含常见语言支持。`CodeViewer` 还内置了基于文件扩展名和内容特征的自动语言检测。如需额外语言支持，可手动注册 highlight.js 语言包。

### Q: 如何在全屏模式下自定义 z-index？

全屏模式的默认 `z-index` 为 `99999`。如需调整，覆盖 CSS：

```css
.dynamic-artifact-viewer.fullscreen {
  z-index: 1000; /* 自定义值 */
}
```

### Q: JSON 制品的 content 支持对象吗？

支持。如果 `content` 不是字符串，会自动使用 `JSON.stringify(content, null, 2)` 进行格式化。

### Q: 如何禁用全屏/下载按钮？

当前版本不支持单独禁用工具栏按钮。如需完全自定义工具栏，建议基于子查看器组件自行组装界面。

---

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器（含 Demo）
npm run dev

# 构建库
npm run build

# 代码格式化
npm run format

# 代码检查
npm run lint
```

---

## 许可证

MIT

---

> 📝 本手册基于 `artifact-viewer` v0.1.0 编写，最后更新日期：2026-06-16