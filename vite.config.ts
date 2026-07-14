import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['demo', 'node_modules'],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Keep public dir for dev server (demo), disable for library build
  publicDir: command === 'serve' ? 'public' : false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ArtifactViewer',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Only externalize react/react-dom; bundle everything else for plug-and-play usage
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Emit CSS as a single file for consumers to import
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || 'asset-[hash][extname]';
        },
      },
    },
    cssCodeSplit: false,
  },
  server: {
    open: '/demo/index.html',
  },
}));
