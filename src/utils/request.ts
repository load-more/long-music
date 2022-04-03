import axios from 'axios'
import { ElMessage } from 'element-plus'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  // 开发环境下使用 vite 的 proxy 代理进行跨域
  baseURL = '/api-dev'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境下在 vercel 服务器中使用 http-proxy-middleware 跨域，原理类似于 vite 的 proxy
  baseURL = '/api'
}

const request = axios.create({
  // 目标服务器地址
  // baseURL: 'https://netease-cloud-music-api-pi-nine.vercel.app/',
  // CORS 出错
  // headers: {
  //   'withCredentials': true
  // },
  baseURL,
  params: {
    timestamp: new Date().valueOf(),
  },
})

// 添加响应拦截器
request.interceptors.response.use(
  // 所有状态码为 2xx 的响应会进入这里
  (response) => response, // 成功状态码，直接返回响应
  (error) => { // 任何状态码超出 2xx 的响应会进入这里
    // 1. 获取状态码和数据
    const { status, data } = error.response
    // 2. 处理异常状态码
    if (status === 400) {
      if (data.code === -462) {
        ElMessage({
          type: 'error',
          message: data.data.blockText,
          appendTo: document.body,
        })
      }
    }
    // 3. 异常返回
    return Promise.reject(error)
  },
)

export default request
