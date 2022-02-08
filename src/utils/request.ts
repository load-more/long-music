import axios from 'axios'

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
    timestamp: new Date().valueOf()
  }
})

export default request