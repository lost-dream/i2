const webpack = require('webpack')
module.exports = {
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
        target: 'http://192.168.1.186:90/',
        // target: 'http://192.168.1.186:8091/',
        changeOrigin: true,
        wx: true,
      },
    },
  },
}
