import axios from 'axios'

const request = axios.create({
  // 后端服务器设置了 CORS，支持跨域
  baseURL: 'https://netease-cloud-music-api-pi-nine.vercel.app/'
})

export default request