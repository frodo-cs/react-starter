import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'router': ['@tanstack/react-router', '@tanstack/router-core', '@tanstack/zod-adapter'],
        'query': ['@tanstack/react-query', '@tanstack/query-core'],
        'zod': ['zod'],
        'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        'http': ['axios'],
        'ui': ['@radix-ui/react-label', '@radix-ui/react-slot', 'lucide-react', 'sonner'],
        'forms': ['react-hook-form', '@hookform/resolvers'],
        'state': ['zustand'],
        'utils': ['./src/lib/toast-promise.ts', './src/lib/utils.ts'],
      },
    },
  },
},
})
