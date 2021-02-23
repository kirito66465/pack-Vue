# pack

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 打包
1. 执行 `npm run build` 命令；
2. 在生成的 `dist` 目录下新建 `index.html'文件；
3. 复制 `dist` 目录下的 `index.js` 内容到 `index.html` 中；
4. 复制 `dist` 目录下所有内容到 `SpringBoot` 项目的 `resources/static` 目录下。

## 问题记录
1. 打包报错 `Error: The loader "xxx/node_modules/html-webpack-plugin/lib/loader.js!xxx/index.html" didn't return html.`
> 解决方法：
> 找到本地的 `xxx/node_modules/html-webpack-plugin/index.js`，查找 `// Evaluate code and cast to string` 所在内容，将内容更改为：
>
```javascript
// Evaluate code and cast to string
let newSource;
try {
  // fix issues: https://github.com/jantimon/html-webpack-plugin/issues/1603
  // newSource = vmScript.runInContext(vmContext);
  vmScript.runInContext(vmContext);
} catch (e) {
  return Promise.reject(e);
}
// see issues: https://github.com/jantimon/html-webpack-plugin/issues/1603
// 添加下面的语句
newSource = vmContext.HTML_WEBPACK_PLUGIN_RESULT;
```
2. elementUI 字体图标显示为框框
> 解决方法：
> 找到本地的 `xxx/build/utils.js`，找到内容修改为以下：
```javascript
if (options.extract) {
    return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        // elementUI 字体图标显示为框框，加上下面语句
        publicPath: '../../'
    })
} else {
    return ['vue-style-loader'].concat(loaders)
}
```
3. 多列筛选过滤问题
> 解决方法：
> filters.列名 未有值时为 defined 而非 null
```javascript
// 条件过滤
handleFilter(filters) {
    if (filters.addr !== undefined) {
        this.addrFilter = filters.addr
        console.log("addr: " + this.addrFilter)
    }
    if (filters.org !== undefined) {
        this.orgFilter = filters.org
        console.log("org: " + this.orgFilter)
    }
    this.getPacks(this.orgFilter, this.addrFilter)
}
```
