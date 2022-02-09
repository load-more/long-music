## Preview

- https://long-music.vercel.app/



## References

- 后端接口：https://netease-cloud-music-api-pi-nine.vercel.app/
- logo 设计：http://uugai.com/
- logo 设计：http://diugai.com/
- 组件库：https://element-plus.gitee.io/zh-CN/component/button.html
- 状态管理：https://pinia.vuejs.org/introduction.html
- 图标字体：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3156169
- 请求库：http://www.axios-js.com/zh-cn/docs/
- 路由管理：https://next.router.vuejs.org/guide/#html
- vue3 新特性：https://v3.cn.vuejs.org/guide/introduction.html



## Challenges

### 跨域

当写到后端接口请求时，不免会遇到跨域问题。

**withCredentials: true**

按照网易云接口文档的提示，api 支持 `CORS 跨域`，即后端通过返回 `Access-Control-Allow-Origin` 等字段进行跨域访问。虽然这种方法可以正常发送并接收跨域请求，但是却不能携带 Cookie。文档也有说明，如果跨域请求想要携带 Cookie，则需要在请求头中添加字段：`{ withCredentials: true }`。

但我尝试了这个方法却发现请求会报错，因为后端返回了 `{ Access-Control-Allow-Origin: * }`，而请求头中如果有 `{ withCredentials: true }`，便会报错，因为这么做表示任何网站都可以发送跨域请求并携带 Cookie，会引发安全问题，所以浏览器就会截断这种请求。

于是，我查询了一些资料，了解到只要把 `Access-Control-Allow-Origin` 设置为单源，即只允许一个网站进行跨域请求，即可以使 `{ withCredentials: true }` 生效。然后，我尝试修改了网易云后端代码，在 `app.js` 这个文件中，将 `Access-Control-Allow-Origin` 这个字段设置为单源。一开始我想设置为 `http://localhost:3000` 在开发环境测试效果，不过还是报错了，我意识到可能不能设置 `localhost` 这样的主机名，所以我百度得到了本机的主机名，再加上端口号进行测试，不过依然失败了。

后来，我就干脆放弃了这种跨域方式，因为要修改后端代码。

**Nginx反向代理**

之后，我了解到 Nginx 反向代理这种方式，虽然这种方式处理起来方便，但却有一些问题。第一，如果在开发环境下，我需要在本机开启一个 Nginx 服务器进行反向代理；第二，如果在生产环境下，我需要有一个 Nginx 服务器进行请求的代理【需要租一个服务器？】不管怎样，这种跨域方式对我这个项目而言，有些不太适合。

**Vecel Severless Functions**

由于我的前端、后端项目都是部署在 Vercel 上的，现在要解决跨域问题，我不想改动后端代码，那么只能是从前端代码中着手了。

在前端代码中，我需要区分开发和生产两种环境，在开发环境中我可以使用 vite 的 server.proxy 进行跨域，其实本质上也是通过开设一个代理服务器将请求进行代理转发，从而实现跨域。

那么生产环境中呢？总不能要求每个用户都在本机上开启一个代理服务器进行代理吧？

后来，我了解到 Vercel 中有一个 Serverless Functions 的功能，其实本质上也是通过开启一个代理服务器进行请求转发实现跨域，只不过这个代理服务器不是由客户端开启，而是通过 Vercel 服务端。

具体参考：https://cloud.tencent.com/developer/article/1830950

**最终方案**

最终确定使用 **Vite server.proxy (开发环境) + Vercel Severless Functions (生产环境)** 这种方式进行跨域，这个方案的优点就是方便，对于我来说只需要修改前端代码即可。



### History模式404问题

这个 Vue 项目中，我采用的是 History 的路由模式，这种模式下路由简洁，但也有一个问题：当直接在输入 URL 或者刷新页面时，会出现 404 问题。

其实本质上是因为单页面应用的机制，Vue 项目打包之后只会生成一个入口文件 `index.html`，之后的页面跳转都是通过 vue-router 实现路由跳转，相对于服务器而言只有一个 `index.html` 资源可以读取，而开发者在 vue-router 设置的路由，如 `/login`，压根没有出现在服务器中，所以当用户刷新页面或直接输入 URL 时，浏览器就会请求对应的资源，而服务器上又压根没有这些资源，所以自然会报 404 错误。

后来，我也百度了很多资料，绕了很多弯路，百度上的答案千篇一律，却又没几个有用的。我尝试修改后端代码，用 vue-router 官网推荐的一个名为 `connect-history-api-fallback` 的插件，然而也没有用。

之后，我才恍然大悟，根本不是后端代码的问题，还是前端代码的问题，因为前端代码是部署在 Vercel 中的，所以依然要从 Vercel 着手。有了 Vercel、History、404 这几个关键词，我想能快速找到问题的解决办法，但百度依然让我时候，万念俱灰之际，我想到了谷歌。让我意外的是，谷歌中的第一个答案就让我解决了所有的问题。果然要对 `vercel.json` 这个文件入手，和解决跨域问题类似，通过 `rewrites` 重写请求即可，不需要任何插件。

参考：https://vuejscode.com/vercel-vite-404-not-found

