import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// element-plus 按需导入【自动导入】
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// path.resolve
import { resolve } from 'path'
// px to viewport
import pxToVw from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: 'sass',
        }),
      ],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        // vw 适配
        pxToVw({
          viewportWidth: 640, // 移动端以 iphone5 宽度为标准
          mediaQuery: true, // 转换媒体查询尺寸
          minPixelValue: 1, // 小于 1px 的尺寸不转换
          propList: [''], // 全部属性不转换单位，只转换媒体查询
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use \'@/style/variables.scss\' as *;',
      },
    },
  },
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
