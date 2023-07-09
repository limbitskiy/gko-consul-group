import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: { transformAssetUrls }
  }),
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  })
  ],
  build: {
    assetsDir: 'assets',
  },
  base: './',
})
