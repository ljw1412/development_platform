const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  devServer: {
    compress: true,
    port: 8998
  },
  configureWebpack: {
    //警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `Builder: ljw1412\nBuild time: ${new Date()}`
      })
    ]
  }
}
