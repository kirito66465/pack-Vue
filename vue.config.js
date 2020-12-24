const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ...其它规则
      {test:/\.vue$/, loader: 'vue-loader'}
    ]
  },
  plugins: [
    // ...其它插件
    new VueLoaderPlugin() // 请确保引入这个插件！
  ]
}
