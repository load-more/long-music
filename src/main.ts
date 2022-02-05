import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// 导入 Message 样式，因为使用自动导入组件会导致样式失效
import 'element-plus/theme-chalk/src/message.scss'
// import 'element-plus/theme-chalk/src/image.scss'
// 导入总样式
// import 'element-plus/theme-chalk/src/index.scss'
// 导入中文样式
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import router from './router'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(createPinia())
app.use(router)
app.mount('#app')
