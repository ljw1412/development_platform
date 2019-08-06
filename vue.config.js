const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const isDevelopment = process.env.NODE_ENV !== 'production'
const isAnalyzer = process.env.npm_lifecycle_event === 'analyzer'

module.exports = {
  publicPath: isDevelopment ? '/' : '',
  productionSourceMap: false,
  devServer: {
    compress: true,
    port: 8998
  },
  configureWebpack: config => {
    const customConfig = {
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
        }),
        new webpack.ProvidePlugin({
          moment: 'moment',
          Cookies: 'js-cookie'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    }
    if (isAnalyzer) customConfig.plugins.push(new BundleAnalyzerPlugin())
    return customConfig
  }
}
