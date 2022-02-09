// 该服务为 vercel serve 跨域处理
const {
  createProxyMiddleware,
} = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  // xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith('/api')) {
    target = 'https://netease-cloud-music-api-pi-nine.vercel.app/'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      // 例如 /api/user/login 将被转发到 https://netease-cloud-music-api-pi-nine.vercel.app/user/login
      '^/api': '',
    },
  })(req, res)
}
