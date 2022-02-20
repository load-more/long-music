## Preview

预览地址：[悠长音乐 LongMusic](https://long-music.vercel.app/)



## Stack

- Vue3
- TypeScript
- ElementPlus
- Vite
- Pinia
- Vue-router
- Axios
- EsLint



## References

文档参考：

- 前端框架：
  - [介绍 | Vue.js](https://v3.cn.vuejs.org/guide/introduction.html)

- 后端接口：
  - [后台API-网易云音乐 API](https://netease-cloud-music-api-pi-nine.vercel.app/)

- 图标制作：
  - [logo制作-U钙网](http://uugai.com/)
  - [logo制作-丢盖网](http://diugai.com/)
  - [favicon制作 - 在线工具](https://tool.lu/favicon/)

- 组件库：
  - [组件库-Element Plus](https://element-plus.gitee.io/zh-CN/component/button.html)

- 状态管理：
  - [状态管理-Pinia](https://pinia.vuejs.org/introduction.html)

- 图标字体：
  - [图标库-iconfont](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3156169)

- 请求库：
  - [axios中文文档](http://www.axios-js.com/zh-cn/docs/)

- 路由管理：
  - [Vue Router 4.x](https://next.router.vuejs.org/guide/#html)

- 跨域：
  - [CORS跨域](https://www.jianshu.com/p/89a377c52b48/)
  - [Vercel跨域](https://zhuanlan.zhihu.com/p/450039194)
  - [vercel跨域2](https://cloud.tencent.com/developer/article/1830950)

- EsLint：
  - [代码规范1](https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true)
  - [代码规范2](https://miyauchi.dev/posts/vite-vue3-typescript/)
  - [代码规范3](https://www.cnblogs.com/ssaylo/p/12806757.html#eslint)

- CSS：
  - [vw适配](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)
  - [Sass教程](https://www.sass.hk/docs/)
  - [GitHub Corners](https://tholman.com/github-corners/)
  - [让CSS flex布局最后一行列表左对齐的N种方法 « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/)
  - [CSS图片间隙产生的原因及解决方法](https://blog.csdn.net/qq_37855074/article/details/88826617)
  - [css实现保持图片宽高比](https://www.cnblogs.com/chen214/p/15152774.html)
  - [CSS hover 父对子、子对父、同级之间的控制](https://blog.csdn.net/coycleipenghui/article/details/108439007?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.pc_relevant_default&spm=1001.2101.3001.4242.1&utm_relevant_index=2)
  - [css扫光效果](https://www.haorooms.com/post/css_saoguang)

- 其他：
  - [解决history模式404问题](https://vuejscode.com/vercel-vite-404-not-found)




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



### 代码规范

**ESLint**

首先，在项目下安装 ESLint：`npm install -D eslint`；

然后，初始化 ESLint 的配置文件：`npm init @eslint/config`，按照提示安装配置即可。这样，就得到了 `.eslintrc.js` 配置文件。

此时，如果要进行代码检查的话，需要通过命令行工具，比如可以在 `package.json` 中自定义一个用于代码检查的命令：`"lint": "eslint --ext .js,.ts,.vue --ignore-path .gitignore --fix ./test.js"`。

当然，每次进行代码检查都要输入 `npm run lint` 这个命令，显然有点傻。

更加便捷的方式是将 ESLint 集成到编辑器中。首先，在 vscode 中安装插件 `eslint`，这样只要项目中有 `.eslintrc.js` 这个配置文件，vscode 就会自动根据配置项对代码进行检查，十分方便。

**Prettier**

有时候，不同开发者可能用到不同的代码规范，比如 A 用到了 Airbnb 的代码规范，而 B 用到了 Standard 的代码规范，虽然这两种规范大部分要求相同，但仍会有一些要求不同，这样就会产生差异。

而 Prettier 的作用就是抹除这种差异，比如 A 和 B 都使用 Prettier 进行代码格式化，Prettier 就会根据自己的一套标准产生一套普适的代码规范。这样即使 Airbnb 和 Standard 两套代码规范有不同的地方，但经过 Prettier 处理过后都会趋于一致。

首先，安装 Prettier：`npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier`；

然后在项目根目录下创建配置文件 `.prettierrc`；

写入一些配置：

```json
{
  "singleQuote": true, // 使用单引号
  "semi": false, // 不加分号
  "vueIndentScriptAndStyle": true // 给vue文件的script和style标签添加缩进
}
```

最后，命令行输入 `npx prettier -w -u .` 即可进行代码格式化，当然这种方式仍然有点傻。

我们可以将 Prettier 集成到编辑器中，因此需要在 vscode 中安装 prettier 插件。

然后，为了方便起见，我们设置每次保存代码后使用 Prettier 进行代码格式化：

```json
// setting.json
{
 // 显示底部栏的 ESLint 状态
  "eslint.alwaysShowStatus": true, 

// 开启编辑器保存代码后，自动格式化
  "editor.formatOnSave": true,

// 设置所有文件的代码格式器为 Prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode" 
}
```

参考：

- https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true
- https://miyauchi.dev/posts/vite-vue3-typescript/
- https://www.cnblogs.com/ssaylo/p/12806757.html#eslint

**解决 ESLint 不能解析路径别名的问题**

本项目使用的是 Typescript，当使用 @ 作为 src 别名时，ESLint 会报 `Unable to resolve path to module '@/xxx/xxx.xxx'.eslint` 的错误。

谷歌了一下，在 StackOverflow 中找到了解决办法：

1. 安装：`npm install eslint-import-resolver-typescript -D`

2. 修改 `.eslintrc.js`：

   ```js
   {
     // other configuration are omitted for brevity
     settings: {
       "import/resolver": {
         typescript: {} // this loads <rootdir>/tsconfig.json to eslint
       },
     },
   }
   ```

参考：https://stackoverflow.com/questions/67835072/vue-3-on-vite-js-with-eslint-unable-to-resolve-path-to-module-eslintimport-no?rq=1



### 项目结构规范

随着项目开发的进行，代码量越来越大，我发现自己的项目结构越来越混乱，所以在中途重构了好几遍代码。如下，总结了几个要点：

1. 组件分离。

   `views` 和 `components` 目录应当各司其职，不应有重叠的部分。

   `views` 负责页面的视图，往往只需要引入几个组件，然后调整这些组件的样式即可，不应到涉及到其他 js 控制部分；

   而 `components` 则是放一些组件，这里我分为了两种组件：**通用组件（放在 common 子目录下）** 和 **视图组件（放在以视图命名的子目录下）**。通用组件表示可能被多个视图引用的组件，比如图片上传组件；而视图组件表示仅仅适用在某个视图下的组件，比如登录页面用到的登录表单组件。

2. 组件命名。

   规范的组件命名可以使代码结构更加清晰。

   - `views` 下的视图文件名通常采用 `XxxPage.vue` 的形式，表示 xx 视图；
   - `components` 下的组件通常根据依赖的视图或通用功能命名，如果两个组件有较强的耦合性，应当采用相同的前缀，比如：`MusicList.vue` 和 `MusicListItem.vue`；
   - 组件命名尽量采用驼峰规范，且至少要有两个首字母大写的单词，比如 `Banner.vue` 通常不使用，而是根据其所在的目录功能加上合适的前缀，比如 banner 放在 `home` 目录下，则可以命名为 `HomeBanner.vue`；
   - 如果一个组件具有唯一性，即只在某处适用，则可以适用 `TheXxx.vue` 的形式命名，比如全局适用的头部栏：`TheHeader.vue`。

3. css 类命名。

   为了避免类名之间重复，可以在最外层的元素类名上加上后缀。

   `views` 中的视图文件中，最外层元素采用 `xxx-container` 的形式命名；

   `components` 中的组件中，最外层元素采用 `xxx-wrap` 的形式命名。

![](https://gitee.com/gainmore/imglib/raw/master/img/20220219160044.png)



### 适配

说实话，这是我第一个认真考虑适配问题的项目，以前对 `适配` 这个概念只是一知半解，没有深入实现过。经过几天的研究，我也是对这个问题有了初步的了解。以下是我的见解：

Web 前端适配可以这样分类：

- PC 端适配
  - 响应式布局（使用一套代码适应 PC 端和移动端）
    - PC 端优先
    - 移动端优先
  - 自适应布局（针对 PC 端和移动端开发多套代码）
- 移动端适配
  - vw / vh 适配（postcss-px-to-viewport）
  - rem 适配
  - ...

其实，也不用特意分为两大类，可以直接这两项归类到响应式开发之中，响应式开发就会涉及到 PC 端适配和移动端适配这两类。然后根据开发优先级编写代码，比如，如果你的网站主要在移动端上运行，那么就是用移动端优先的优先级开发，即先按照移动端的设计图开发界面，后面再根据媒体查询适配 PC 端；如果网站主要运行在 PC 端，那就先根据 PC 端设计图开发界面，之后再通过媒体查询适配移动端，这就是 PC 端优先。

响应式布局利用到最多的一个特性就是 `媒体查询`，通过查询设备屏幕的宽度信息，根据设置的断点判断是否是移动端，以下是 BootStrap 的断点参考：

```css
/* 大屏幕（大桌面显示器） width > 1200px */
body {
  background-color: yellow;
}

/* 中等屏幕（桌面显示器） 992px - 1200px */
@media screen and (max-width: 1200px) {
  body {
    background-color: #f5c8f5;
  }
}

/* 小屏幕（平板） 768px - 992px */
@media screen and (max-width: 992px) {
  body {
    background-color: #FF00FF;
  }
}

/* 超小屏幕（手机） < 768px */
@media screen and (max-width: 768px) {
  body {
    background-color: green;
  }
}

/*
	以上是基于 PC 端优先实现的媒体查询，因为是 PC 端优先，所以一开始用户设备的屏幕很大，然后通过响应式逐步缩小屏幕宽度，所以这里使用到的是 max-width，屏幕尺寸逐渐缩小；
	如果是移动端优先，则应该采用 min-width，屏幕尺寸逐渐增大。
*/
```

然后，就可以控制元素的显隐，实现布局的响应式。这里，ElementPlus 设置了基于断点的隐藏类，可以直接添加给元素，更加便捷。

由于本项目是基于 PC 端优先的理念开发的，所以会先设计 PC 端页面，之后转入移动端适配。

因为移动端宽度通常比 PC 端小，所以如果直接将 PC 端的那套代码搬到移动端，肯定会导致移动端显示的内容过大，为了实现元素的等比例缩放，这里我会用到 `postcss-px-to-viewport` 这个插件，将项目中的 px 单位转为 vw。

而 `postcss-px-to-viewport` 这个插件默认是将所有类的尺寸 px 都转换，这样就会导致 PC 端的元素也一同等比例缩放，为了解决这个问题，我设置这个插件不转换所有尺寸，然后只转换媒体查询的尺寸，这样就解决了这个问题。如此，我只要先正常按照 PC 端页面尺寸开发，之后需要适配移动端的话，再在媒体查询中写上移动端的设计尺寸即可。

```typescript
// vite.config.ts
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
  },
```

