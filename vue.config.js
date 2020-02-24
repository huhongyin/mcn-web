const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  lintOnSave: true,
  devServer: {
      open: process.platform === 'darwin',
      host: '127.0.0.1',
      port: 9099,
      https: false,
      hotOnly: false,
      proxy: null, // 设置代理
      before: app => {}
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@views',resolve('src/views'))
      .set('vendor', resolve('src/vendor'))
    config.performance.set('hints', false);
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  }
};