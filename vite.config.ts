import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// element-plus 按需导入【自动导入】
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // 设置路径别名
      '@': resolve(__dirname, './src'),
    },
  },
  // vite@2.7.13 存在 bug，无效，暂时不用
  server: {
    proxy: {
      // 设置服务器代理
      '/api-dev': {
        // 将 /api 开头的请求拼接到 target 后面
        // 比如请求 /api => https://netease-cloud-music-api-pi-nine.vercel.app/api
        target: 'https://netease-cloud-music-api-pi-nine.vercel.app/',
        changeOrigin: true, // 是否跨域
        ws: true, // 是否代理 websockets
        secure: false,
        // 将 /api 开头的请求的 /api 字符串替换成空字符，然后再拼接
        // 比如请求 /api => '' => https://netease-cloud-music-api-pi-nine.vercel.app/
        rewrite: (path) => path.replace(/^\/api-dev/, ''),
      },
    },
  },
})
