const webpack = require('webpack')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'i2',
  productionSourceMap: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/': {
        ws: false,
        target: 'http://192.168.1.186:90/',
        changeOrigin: true,
        wx: true,
      },
    },
  },
}
